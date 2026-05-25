import express from "express";
import userRoutes from "./routes/user.routes";
import { connectRedis } from "./config/redis";

const app = express();
app.use(express.json());
app.use("/api", userRoutes);

const start = async () => {
  await connectRedis();
  app.listen(3000, () => console.log("Server running on port 3000"));
};

start();