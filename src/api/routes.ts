import { Router } from "express";
import { z } from "zod";
import { eventQueue } from "../queue/eventQueue";

const router = Router();

const EventSchema = z.object({
  type: z.string(),
  data: z.object({ playerId: z.string() }),
});

export type Event = {
  type: string;
  data: { playerId: string };
};

// API endpoint for event ingestion
router.post("/events", async (req, res) => {
  try {
    const event = EventSchema.parse(req.body);
    await eventQueue.add("process-event", event, {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
    });
    res.status(200).json({ message: "Event queued successfully" });
  } catch (error) {
    res.status(400).json({
      error: { error: error instanceof Error ? error.message : "Invalid data" },
    });
  }
});

export { router };
