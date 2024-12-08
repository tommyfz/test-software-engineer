import express from "express";
import { router } from "./api/routes";

const app = express();
app.use(express.json());

// Register the API routes
app.use("/api", router);

// Start the API server
app.listen(3000, async () => {
  console.log("API running on port 3000");
});
