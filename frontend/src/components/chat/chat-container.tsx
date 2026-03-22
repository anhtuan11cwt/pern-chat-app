import { IoChatbubbles } from "react-icons/io5";
import { useChatStore } from "@/store/use-chat-store";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import ChatWindow from "./chat-window";

const ChatContainer = () => {
  const { selectedUser, isConversationLoading } = useChatStore();

  if (!selectedUser) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 text-gray-500 bg-white/5 max-md:hidden">
        <IoChatbubbles className="text-violet-700" size={60} />
        <p className="text-lg font-medium text-white">
          Chọn một người dùng để bắt đầu trò chuyện
        </p>
        <p className="text-sm text-gray-400">Chọn một liên hệ từ thanh bên</p>
      </div>
    );
  }

  if (isConversationLoading) {
    return (
      <div className="flex items-center justify-center bg-white/5">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Đang tải cuộc trò chuyện...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden backdrop-blur-lg relative flex flex-col bg-white/5">
      <ChatHeader />
      <ChatWindow />
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
