import { createServer } from "node:http";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { config } from "dotenv";
import express, { type Request, type Response } from "express";
import { auth } from "./lib/auth";
import profileRoutes from "./routes/profile.routes";
import userRoutes from "./routes/user.routes";
import { initSocket } from "./sockets";

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

app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);

app.all("/api/auth/{*splat}", toNodeHandler(auth));

app.get("/", (_req: Request, res: Response) => {
  res.send("Máy chủ đang chạy bình thường");
});

const httpServer = createServer(app);
initSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
});
