export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
};

export type Conversation = {
  id: string;
  createdAt: string;
  participants: User[];
};

export type Message = {
  id: string;
  content: string;
  createdAt: string;
  conversationId: string;
  sender: User;
};
