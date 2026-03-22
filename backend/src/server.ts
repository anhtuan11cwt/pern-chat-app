import { createServer } from "node:http";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { config } from "dotenv";
import express, { type Request, type Response } from "express";
import { auth } from "./lib/auth";

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: process.env.ORIGIN,
  }),
);

app.use(express.json());

app.all("/api/auth/{*splat}", toNodeHandler(auth));

app.get("/", (_req: Request, res: Response) => {
  res.send("Máy chủ đang chạy bình thường");
});

const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
});
