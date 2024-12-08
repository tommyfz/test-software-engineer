import { Worker } from "bullmq";
import { PrismaClient } from "@prisma/client";
import { Event } from "../api/routes";

const prisma = new PrismaClient();

export const worker = new Worker<Event>(
  "game-events",
  async (job) => {
    const { type, data } = job.data;

    // Process and store event in the database
    await prisma.gameEvent.create({
      data: { type, data },
    });

    console.log(`Processed event: ${type}`);
  },
  { connection: { host: "localhost", port: 6379 } }
);

worker.on("failed", (job, err) => {
  console.error(`Job failed: ${job?.id}, Error: ${err.message}`);
});
