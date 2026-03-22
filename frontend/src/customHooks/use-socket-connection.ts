import { useEffect } from "react";
import { io } from "socket.io-client";
import { authClient } from "../lib/auth-client";
import { useChatStore } from "../store/use-chat-store";
import { useSocketStore } from "../store/use-socket-store";

export function useSocketConnection() {
  const { socket, setSocket } = useSocketStore();
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    const newSocket = io("http://localhost:3000", {
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      console.log("Socket đã kết nối:", newSocket.id);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userId, setSocket]);

  useEffect(() => {
    if (!socket) return;

    const handleReconnect = () => {
      const activeConversation = useChatStore.getState().activeConversation;
      if (activeConversation) {
        socket.emit("conversation:join", activeConversation.id);
      }
    };

    socket.on("connect", handleReconnect);
    return () => {
      socket.off("connect", handleReconnect);
    };
  }, [socket]);
}
