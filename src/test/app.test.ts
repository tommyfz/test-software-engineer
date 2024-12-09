import request from "supertest";
import app from "../app";

describe("POST /events", () => {
  it("queues a GAME_EVENT event successfully", async () => {
    const response = await request(app)
      .post("/events")
      .send({
        type: "GAME_EVENT",
        data: { playerId: "JohnDoe" },
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Event GAME_EVENT queued successfully");
  });

  it("queues a PLAYER_EVENT event successfully", async () => {
    const response = await request(app)
      .post("/events")
      .send({
        type: "PLAYER_EVENT",
        data: { name: "JohnDoe", score: 10, gamesPlayed: 1 },
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Event PLAYER_EVENT queued successfully"
    );
  });

  it("returns 400 for invalid input", async () => {
    const response = await request(app).post("/events").send({});
    expect(response.status).toBe(400);
  });
});
