import { createServer } from "node:http";
import express, { type Request, type Response } from "express";

const app = express();
const port = 3000;

app.get("/", (_req: Request, res: Response) => {
  res.send("Máy chủ đang chạy bình thường");
});

const httpServer = createServer(app);

httpServer.listen(port, () => {
  console.log(`Máy chủ đang chạy trên cổng ${port}`);
});
