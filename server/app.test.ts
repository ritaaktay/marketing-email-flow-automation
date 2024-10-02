import request from "supertest";
import app from "./app";
import { sendEmail } from "./executors/sendEmail";

const endpoint = "/marketing/flows";

// Mocking sendEmail so we can control when it fails or succeeds
jest.mock("./executors/sendEmail");

describe("POST /marketing/flows", () => {
  describe("When input format is incorrect", () => {
    it("Sends 400 Error message", async () => {
      const response = await request(app).post(endpoint).send({
        incorrect: "",
        format: 0,
      });
      expect(response.status).toBe(400);
      expect(response.text).toBe("Received invalid event format");
    });
  });

  describe("When no flow is found for the event", () => {
    it("Sends 500 Error message", async () => {
      const response = await request(app).post(endpoint).send({
        eventName: "unknownEvent",
        userEmail: "pete@healthtech1.uk",
      });
      expect(response.status).toBe(500);
      expect(response.text).toBe(
        `There is no flow defined for the event "unknownEvent"`
      );
    });
  });

  describe("When all actions succeed", () => {
    beforeAll(() => {
      (sendEmail as jest.Mock).mockResolvedValueOnce(
        'Sent an email to pete@healthtech1.uk with subject "Payment received"'
      );
      (sendEmail as jest.Mock).mockResolvedValueOnce(
        'Sent an email to pete@healthtech1.uk with subject "Socks dispatched!"'
      );
    });

    afterAll(() => {
      (sendEmail as jest.Mock).mockClear();
    });

    it("Sends 200 OK response with details of results", async () => {
      const response = await request(app).post(endpoint).send({
        eventName: "socksPurchased",
        userEmail: "pete@healthtech1.uk",
      });
      expect(response.status).toBe(200);
      expect(response.text).toEqual(
        "🧦 Successfully executed flow for socksPurchased!\n" +
          "👍 Completed:\n" +
          'Sent an email to pete@healthtech1.uk with subject "Payment received",\n' +
          'Sent an email to pete@healthtech1.uk with subject "Socks dispatched!"\n'
      );
    });
  });

  describe("When an action fails to execute", () => {
    beforeAll(() => {
      (sendEmail as jest.Mock).mockRejectedValueOnce("Failed to send email");
    });

    afterAll(() => {
      (sendEmail as jest.Mock).mockClear();
    });

    it("Sends 500 Error message with details of results", async () => {
      const response = await request(app).post(endpoint).send({
        eventName: "socksPurchased",
        userEmail: "pete@healthtech1.uk",
      });
      expect(response.status).toBe(500);
      expect(response.text).toEqual(
        "🧦 Could not complete flow for socksPurchased\n" +
          "👎 Failed:\n" +
          "Failed to send email\n" +
          'Action: {"type":"email","subject":"Payment received","body":"Thank you!"}'
      );
    });
  });
});
