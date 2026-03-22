import { create } from "zustand";
import type { Conversation, Message, User } from "@/lib/types";

interface ChatStore {
  activeConversation: Conversation | null;
  addMessage: (msg: Message) => void;
  isConversationLoading: boolean;
  isMessagesLoading: boolean;
  messages: Message[];
  selectedUser: User | null;
  setActiveConversation: (conv: Conversation | null) => void;
  setConversationLoading: (loading: boolean) => void;
  setMessages: (msgs: Message[]) => void;
  setMessagesLoading: (loading: boolean) => void;

  setSelectedUser: (user: User | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  activeConversation: null,
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  isConversationLoading: false,
  isMessagesLoading: false,
  messages: [],
  selectedUser: null,
  setActiveConversation: (conv) => set({ activeConversation: conv }),
  setConversationLoading: (loading) => set({ isConversationLoading: loading }),
  setMessages: (msgs) => set({ messages: msgs }),
  setMessagesLoading: (loading) => set({ isMessagesLoading: loading }),

  setSelectedUser: (user) => set({ selectedUser: user }),
}));
