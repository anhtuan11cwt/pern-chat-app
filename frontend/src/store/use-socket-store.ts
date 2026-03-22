import type { Socket } from "socket.io-client";
import { create } from "zustand";

interface SocketStore {
  setSocket: (socket: Socket | null) => void;
  socket: Socket | null;
}

export const useSocketStore = create<SocketStore>((set) => ({
  setSocket: (socket) => set({ socket }),
  socket: null,
}));
