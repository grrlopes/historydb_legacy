const request = require("supertest");
const expect = require("chai").expect;

const Commands = require('../models/commands');
const app = require("../app");

describe("Endpoint /api/", () => {
  beforeEach(async () => {
    await Commands.deleteMany();
  });
  describe("GET command/?_id = ID", () => {
    it("should return a user if valid id is passed", async () => {
      const commands = new Commands({
        author: "Gabriel",
        title: "teste_teste",
        definition: "__teste",
        commands: [{
          author: "Gabriel",
          command: "commComm",
          main: true,
        }],
      });
      result = await commands.save();
      const res = await request(app).get("/api/command/?_id=" + result._id);
      expect(res.status).to.equal(200);
      expect(res.body.data[0]).to.deep.include({
        author: commands.author,
        title: commands.title,
        definition: commands.definition,
        cmd_author: commands.commands[0].author,
        command: commands.commands[0].command,
      });
    });

    it("should return 500 error when invalid object id is passed", async () => {
      const res = await request(app).get("/api/command/?_id=2f7068d6b8dbec2bd6aeb1c1d");
      expect(res.status).to.equal(500);
    });

    it("should return 404 error when valid object id is passed but does not exist", async () => {
      const res = await request(app).get("/api/command/?_id=2f7068d6b8dbec2bd6ae1bc3");
      expect(res.status).to.equal(404);
    });
  });

  describe("GET commands/?page=1&start=0&limit=50", () => {
    it("should return all users", async () => {
      const commands = [
        {
          author: "Gabriel", title: "teste_teste", definition: "__teste",
          commands: [{ author: "Gabriel", command: "commComm", main: true}]
        },
        {
          author: "Gabriel1", title: "teste_teste1", definition: "__teste1",
          commands: [{ author: "Gabriel1", command: "commComm1", main: true}]
        }
      ];
      await Commands.insertMany(commands);
      const token = await request(app).post("/auth/login").send({
        username: "test",
        password: "12345678"
      });
      const res = await request(app).get("/api/commands?page=1&start=0&limit=50")
      .set('Authorization', 'Bearer '+token.body.token);
      expect(res.status).to.equal(200);
      expect(res.body.total).to.equal(2);
    });
  });

});
