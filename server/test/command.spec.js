/**
 * That test should be refactored due
 * to having a planty of repetition.
 */
const request = require("supertest");
const { expect } = require("chai");

const Commands = require("../models/commands");
const app = require("../app");

describe("Endpoint /api/", () => {
  beforeEach(async () => {
    await Commands.deleteMany();
  });
  describe("GET command/?_id = ID", () => {
    it("should return 'command object' by id after it has been created", async () => {
      const commands = new Commands({
        author: "Gabriel",
        title: "teste_teste",
        definition: "__teste",
        commands: [
          {
            author: "Gabriel",
            command: "commComm",
            main: true,
          },
        ],
      });
      result = await commands.save();
      const token = await request(app).post("/auth/login").send({
        username: "test",
        password: "12345678",
      });
      const res = await request(app)
        .get(`/api/command/?_id=${result._id}`)
        .set("Authorization", `Bearer ${token.body.token}`);
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
      const token = await request(app).post("/auth/login").send({
        username: "test",
        password: "12345678",
      });
      const res = await request(app)
        .get("/api/command/?_id=2f7068d6b8dbec2bd6aeb1c1d")
        .set("Authorization", `Bearer ${token.body.token}`);
      expect(res.status).to.equal(500);
    });

    it("should return 404 error when valid object id is passed but does not exist", async () => {
      const token = await request(app).post("/auth/login").send({
        username: "test",
        password: "12345678",
      });
      const res = await request(app)
        .get("/api/command/?_id=2f7068d6b8dbec2bd6ae1bc3")
        .set("Authorization", `Bearer ${token.body.token}`);
      expect(res.status).to.equal(404);
    });
  });

  describe("GET commands/?page=1&start=0&limit=50", () => {
    it("should return all users", async () => {
      const commands = [
        {
          author: "Gabriel",
          title: "teste_teste",
          definition: "__teste",
          commands: [{ author: "Gabriel", command: "commComm", main: true }],
        },
        {
          author: "Gabriel1",
          title: "teste_teste1",
          definition: "__teste1",
          commands: [{ author: "Gabriel1", command: "commComm1", main: true }],
        },
      ];
      await Commands.insertMany(commands);
      const token = await request(app).post("/auth/login").send({
        username: "test",
        password: "12345678",
      });
      const res = await request(app)
        .get("/api/commands?page=1&start=0&limit=50")
        .set("Authorization", `Bearer ${token.body.token}`);
      expect(res.status).to.equal(200);
      expect(res.body.total).to.equal(2);
    });
  });

  describe("POST newregcommand/", () => {
    it("should return message: Command has added!", async () => {
      const command = {
        author: "Test ",
        title: "qwqwqwqw",
        definition: "xxzxzxzx",
        command: "xzxzx vcvvccv",
      };
      const token = await request(app).post("/auth/login").send({
        username: "test",
        password: "12345678",
      });
      const res = await request(app)
        .post("/api/newRegCommand")
        .send(command)
        .set("Authorization", `Bearer ${token.body.token}`);
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("message", "Command has added!");
    });

    it("should return code 400 whether a wrong or missing fields are passed.", async () => {
      const command = {
        author: "Test",
        definition: "xxzxzxzx",
        command: "xzxzx vcvvccv",
      };
      const token = await request(app).post("/auth/login").send({
        username: "test",
        password: "12345678",
      });
      const res = await request(app)
        .post("/api/newRegCommand")
        .send(command)
        .set("Authorization", `Bearer ${token.body.token}`);
      expect(res.status).to.equal(400);
      expect(res.body.message).to.be.a("string");
    });
  });

  describe("POST addcommand/", () => {
    it("should return message: Command added!", async () => {
      const idd = await request(app)
      .get("/api/commands?page=1&start=0&limit=1")
      .set("Authorization", `Bearer ${token.body.token}`);
      console.log(idd);
      return
      const addcommand = {
        _id:"5e76d5f19f031a48d9dd4ffc",
        author: "Test Add",
        command: "Test xxxcvv addcommand"
      };
      const token = await request(app).post("/auth/login").send({
        username: "test",
        password: "12345678",
      });
      const res = await request(app)
        .post("/api/addcommand")
        .send(addcommand)
        .set("Authorization", `Bearer ${token.body.token}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "Command added!");
    })
  });

});
