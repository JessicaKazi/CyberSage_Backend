const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../server");

const expect = chai.expect;
chai.use(chaiHttp);

describe("CyberSage Backend API", function () {
  this.timeout(10000);

  describe("Signup - POST /signup", function () {
    it("should reject a missing full name", async function () {
      const res = await chai.request(app).post("/signup").send({
        email: "test@example.com",
        password: "password123"
      });

      expect(res).to.have.status(400);
    });

    it("should reject an invalid email", async function () {
      const res = await chai.request(app).post("/signup").send({
        fullName: "Test User",
        email: "invalid-email",
        password: "password123"
      });

      expect(res).to.have.status(400);
    });

    it("should reject a password shorter than six characters", async function () {
      const res = await chai.request(app).post("/signup").send({
        fullName: "Test User",
        email: "shortpass@example.com",
        password: "12345"
      });

      expect(res).to.have.status(400);
    });
  });

  describe("Login - POST /login", function () {
    it("should reject missing email and password", async function () {
      const res = await chai.request(app).post("/login").send({});

      expect(res).to.have.status(400);
    });

    it("should reject invalid credentials", async function () {
      const res = await chai.request(app).post("/login").send({
        email: "unknown@example.com",
        password: "wrongpassword"
      });

      expect(res).to.have.status(400);
    });
  });

  describe("Shopping Cart", function () {
    it("should require a userId when retrieving a cart", async function () {
      const res = await chai.request(app).get("/userscarts");

      expect(res).to.have.status(400);
    });

    it("should require userId and productId when adding to a cart", async function () {
      const res = await chai.request(app).post("/userscarts").send({
        quantity: 1
      });

      expect(res).to.have.status(400);
    });

    it("should reject a quantity below one", async function () {
      const res = await chai.request(app).put(
        "/userscarts/507f1f77bcf86cd799439011"
      ).send({
        quantity: 0
      });

      expect(res).to.have.status(400);
    });
  });

  describe("Orders", function () {
    it("should require customer information", async function () {
      const res = await chai.request(app).post("/orders").send({
        cart: [{ productId: "product-1", quantity: 1 }],
        total: 100
      });

      expect(res).to.have.status(400);
    });

    it("should require at least one product", async function () {
      const res = await chai.request(app).post("/orders").send({
        customer: {
          fullName: "Test User",
          email: "test@example.com"
        },
        cart: [],
        total: 100
      });

      expect(res).to.have.status(400);
    });

    it("should reject an invalid order ID", async function () {
      const res = await chai.request(app).get("/orders/not-a-valid-id");

      expect(res).to.have.status(400);
    });

    it("should deny access to orders without admin authentication", async function () {
      const res = await chai.request(app).get("/orders");

      expect(res).to.have.status(401);
    });

    it("should reject an invalid order status without admin authentication", async function () {
      const res = await chai.request(app)
        .put("/orders/507f1f77bcf86cd799439011/status")
        .send({
          status: "InvalidStatus"
        });

      expect(res).to.have.status(401);
    });
  });
});