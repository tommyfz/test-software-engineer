import { Router, Request, Response } from "express";
import { z } from "zod";
import { eventQueue, playerQueue } from "../queue/eventQueue";

const router = Router();

const PlayerEventDataSchema = z.object({
  name: z.string(),
  score: z.number(),
  gamesPlayed: z.number(),
});

const GameEventDataSchema = z.object({
  playerId: z.string(),
});

const EventSchema = z.object({
  type: z.enum(["GAME_EVENT", "PLAYER_EVENT"]),
  data: z.union([GameEventDataSchema, PlayerEventDataSchema]),
});

type EVENT_TYPE = "GAME_EVENT" | "PLAYER_EVENT";

export type Event = {
  type: EVENT_TYPE;
  data: { playerId: string };
};

export type Player = {
  type: EVENT_TYPE;
  data: { name: string; score: number; gamesPlayed: number };
};

// API endpoint for event ingestion
router.post("/events", async (req: Request, res: Response) => {
  try {
    const event = EventSchema.parse(req.body);
    if (event.type === "GAME_EVENT") {
      await eventQueue.add("process-event", event, {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 1000,
        },
      });
    } else if (event.type === "PLAYER_EVENT") {
      await playerQueue.add("player-event", event, {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 1000,
        },
      });
    } else {
      res.status(400).json({ message: "Unknown event type" });
    }
    res
      .status(200)
      .json({ message: `Event ${event.type} queued successfully` });
  } catch (error) {
    res.status(400).json({
      error: { error: error instanceof Error ? error.message : "Invalid data" },
    });
  }
});

export { router };
