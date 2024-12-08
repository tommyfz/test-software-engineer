import { Queue } from "bullmq";

export const eventQueue = new Queue("game-events", {
  connection: { host: "localhost", port: 6379 },
});
