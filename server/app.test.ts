import request from "supertest";
import app from "./app";

const endpoint = "/marketing/flows";

describe("POST /marketing/flows", () => {
  describe("When input format is incorrect", () => {
    it("Sends 400 Error message", async () => {
      const response = await request(app).post(endpoint).send({
        eventName: "socksPurchased",
        userEmail: "pete@healthtech1.uk",
      });
      // TODO - How to handle that is sometimes fails and sometimes succeeds?
      expect(response.statusCode).toBe(200);
    });
  });

  describe("When no flow is found for the event", () => {
    it("Sends 500 Error message", async () => {
      // Status 500
      // Message:
    });
  });

  describe("When no function is found for an action", () => {
    it("Sends 500 Error message with details of results", async () => {
      // Status 500
      // Message:
    });
  });

  describe("When an action fails to execute", () => {
    it("Sends 500 Error message with details of results", async () => {
      // Status 500
      // Message:
    });
  });

  describe("When all actions succeed", () => {
    it("Sends 200 OK response with details of results", async () => {
      // Status 500
      // Message:
    });
  });
});
