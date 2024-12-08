import request from "supertest";
import app from "../app";

describe("POST /events", () => {
  it("queues an event successfully", async () => {
    const response = await request(app)
      .post("/events")
      .send({
        type: "game-start",
        data: { playerId: "JohnDoe" },
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Event queued successfully");
  });

  it("returns 400 for invalid input", async () => {
    const response = await request(app).post("/events").send({});
    expect(response.status).toBe(400);
  });
});
