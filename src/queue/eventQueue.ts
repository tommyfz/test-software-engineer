import { Queue } from "bullmq";
import { configuration } from "../config/config";

export const eventQueue = new Queue("game-events", {
  connection: { host: configuration.redisHost, port: 6379 },
});
