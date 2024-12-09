import { Worker } from "bullmq";
import { PrismaClient } from "@prisma/client";
import { Event, Player } from "../api/routes";
import { configuration } from "../config/config";

const prisma = new PrismaClient();

export const worker = new Worker<Player>(
  "player-events",
  async (job) => {
    const { data } = job.data;

    let player = await prisma.player.findUnique({ where: { name: data.name } });
    if (!player) {
      player = await prisma.player.create({
        data: {
          name: data.name,
          score: data.score,
          gamesPlayed: data.gamesPlayed,
        },
      });
    } else {
      player = await prisma.player.update({
        where: { name: data.name },
        data: {
          score: player.score + data.score,
          gamesPlayed: player.gamesPlayed + 1,
        },
      });
    }
    console.log(`Player event processed for ${data.name}`);
  },
  { connection: { host: configuration.redisHost, port: 6379 } }
);

worker.on("failed", (job, err) => {
  console.error(`Job failed: ${job?.id}, Error: ${err.message}`);
});
