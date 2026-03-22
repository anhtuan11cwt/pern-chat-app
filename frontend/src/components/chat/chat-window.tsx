import { useEffect, useRef } from "react";
import { assets } from "@/lib/assets";
import { authClient } from "@/lib/auth-client";
import API from "@/lib/axios";
import { useChatStore } from "@/store/use-chat-store";

const LoadingScreen = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Đang tải...</p>
      </div>
    </div>
  );
};

const EmptyChat = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <p className="text-gray-500 text-sm">Chưa có tin nhắn nào</p>
    </div>
  );
};

const ChatWindow = () => {
  const scrollToBottomRef = useRef<HTMLDivElement | null>(null);
  const {
    messages,
    isMessagesLoading,
    setMessages,
    setMessagesLoading,
    activeConversation,
  } = useChatStore();
  const { data: session } = authClient.useSession();

  // Fetch messages when activeConversation changes
  useEffect(() => {
    if (!activeConversation) return;

    const fetchMessages = async () => {
      setMessagesLoading(true);
      setMessages([]);
      try {
        const response = await API.get(`/messages/${activeConversation.id}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.error(error);
      } finally {
        setMessagesLoading(false);
      }
    };

    fetchMessages();
  }, [activeConversation, setMessages, setMessagesLoading]);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    scrollToBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Chọn một cuộc trò chuyện...
      </div>
    );
  }

  return (
    <div
      className="flex flex-col overflow-y-auto px-4 py-3 gap-1"
      style={{ height: "calc(100% - 120px)" }}
    >
      {isMessagesLoading && <LoadingScreen />}

      {!isMessagesLoading && messages.length === 0 && <EmptyChat />}

      {!isMessagesLoading &&
        messages.map((message) => {
          const isMe = message.sender.id === session?.user?.id;

          return (
            <div
              className={`flex items-end gap-2 mb-3 ${isMe ? "justify-end" : "flex-row-reverse"}`}
              key={message.id}
            >
              <p
                className={`max-w-[65%] px-4 py-2.5 text-sm leading-relaxed break-words text-white
                  ${
                    isMe
                      ? "bg-violet-500/50 rounded-2xl rounded-br-none"
                      : "bg-gray-700/50 rounded-2xl rounded-bl-none"
                  }`}
              >
                {message.content}
              </p>
              <div className="flex flex-col items-center shrink-0">
                <img
                  alt={message.sender.name}
                  className="w-7 h-7 rounded-full object-cover"
                  src={message.sender.avatar || assets.avatar}
                />
                <p className="text-[10px] text-gray-500 mt-1">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    hour12: false,
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}

      <div ref={scrollToBottomRef} />
    </div>
  );
};

export default ChatWindow;
