const request = require("supertest");
const expect = require("chai").expect;

const Signup = require('../models/authenticator');
const app = require("../app");

describe("Endpoint /auth/", () => {
  before(async () => {
    await Signup.deleteMany();
  });
  describe("POST auth/signup", () => {
    it("should return code 201 user created", async () => {
      const newLogin = new Signup({
        email: "test@test.com",
        name: "Testy",
        surname: "Testin",
        username: "test",
        password: "12345678"
      });
      const res = await request(app).post("/auth/signup").send(newLogin);
      expect(res.status).to.equal(201);
    });

  });

  describe("POST auth/login", () => {
    it("should return code 200 if valid credencial is passed", async () => {
      const res = await request(app).post("/auth/login").send({
        username: "test",
        password: "12345678"
      });
      expect(res.status).to.equal(200);
    });

    it("should conten token and userId", async () => {
      const res = await request(app).post("/auth/login").send({
        username: "test",
        password: "12345678"
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("token");
      expect(res.body).to.have.property("userId");
      expect(res.body).to.have.property("message", "success");
    });

    it("should return message: wrong password", async () => {
      const res = await request(app).post("/auth/login").send({
        username: "test",
        password: "123456789"
      });
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property("message", "Wrong password");
    });

    it("should return message: Login do not match!", async () => {
      const res = await request(app).post("/auth/login").send({
        username: "testt",
        password: "12345678"
      });
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property("message", "Login do not match!");
    })
  });



})
