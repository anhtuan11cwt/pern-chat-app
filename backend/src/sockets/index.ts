import type { Server as HTTPServer } from "node:http";
import { fromNodeHeaders } from "better-auth/node";
import { Server } from "socket.io";
import { auth } from "../lib/auth";

export let io: Server;

const onlineUsers = new Map<string, string>();

export function initSocket(server: HTTPServer) {
  io = new Server(server, {
    cors: {
      credentials: true,
      origin: process.env.ORIGIN,
    },
  });

  io.on("connection", async (socket) => {
    console.log("Socket đã kết nối:", socket.id);

    try {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(
          socket.handshake.headers as Record<string, string>,
        ),
      });

      if (!session) {
        socket.disconnect();
        return;
      }

      const userId = session.user.id;

      onlineUsers.set(userId, socket.id);

      io.emit("onlineUsers", Array.from(onlineUsers.keys()));

      socket.on("conversationJoin", (conversationId: string) => {
        socket.join(conversationId);
        console.log(`Người dùng đã tham gia phòng: ${conversationId}`);
      });

      socket.on("conversationLeave", (conversationId: string) => {
        socket.leave(conversationId);
        console.log(`Người dùng đã rời phòng: ${conversationId}`);
      });

      socket.on("disconnect", () => {
        onlineUsers.delete(userId);
        io.emit("onlineUsers", Array.from(onlineUsers.keys()));
      });
    } catch (err) {
      console.error("Lỗi socket:", err);
      socket.disconnect();
    }
  });
}
