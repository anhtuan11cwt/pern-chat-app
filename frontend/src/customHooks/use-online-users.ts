import { useEffect, useState } from "react";
import { useSocketStore } from "@/store/use-socket-store";

export function useSocketForOnlineUsers(userId?: string) {
  const { socket } = useSocketStore();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!socket || !userId) return;

    const handleOnlineUsers = (users: string[]) => {
      setOnlineUsers(users);
    };

    socket.on("onlineUsers", handleOnlineUsers);

    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
    };
  }, [socket, userId]);

  return { onlineUsers };
}
