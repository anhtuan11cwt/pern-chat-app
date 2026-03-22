import { useEffect, useRef } from "react";
import image1 from "@/assets/image1.jpg";
import { assets } from "@/lib/assets";
import type { Message } from "@/lib/types";
import { useChatStore } from "@/store/use-chat-store";

const MOCK_MESSAGES: Message[] = [
  {
    content: "Chào bạn! Bạn khoẻ không?",
    conversationId: "conv-1",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    id: "m1",
    sender: {
      avatar: image1,
      email: "alice@test.com",
      id: "1",
      name: "Alice Nguyen",
    },
  },
  {
    content:
      "Mình rất khoẻ! Vừa hoàn thành tính năng mới. Bạn nghĩ sao về thiết kế glass morphism?",
    conversationId: "conv-1",
    createdAt: new Date(Date.now() - 3500000).toISOString(),
    id: "m2",
    sender: { email: "me@test.com", id: "me", name: "Tôi" },
  },
  {
    content:
      "Trông tuyệt lắm! Hiệu ứng mờ rất mượt. Mình cũng thích theme màu tím đậm.",
    conversationId: "conv-1",
    createdAt: new Date(Date.now() - 3400000).toISOString(),
    id: "m3",
    sender: {
      avatar: image1,
      email: "alice@test.com",
      id: "1",
      name: "Alice Nguyen",
    },
  },
  {
    content:
      "Cảm ơn nhé! Mình đã dành nhiều thời gian cho responsive layout. Hoạt động tốt trên điện thoại, máy tính bảng và máy tính bàn.",
    conversationId: "conv-1",
    createdAt: new Date(Date.now() - 3300000).toISOString(),
    id: "m4",
    sender: { email: "me@test.com", id: "me", name: "Tôi" },
  },
  {
    content:
      "Bạn có thể cho mình xem code không? Mình muốn học cách bạn làm grid layout.",
    conversationId: "conv-1",
    createdAt: new Date(Date.now() - 3200000).toISOString(),
    id: "m5",
    sender: {
      avatar: image1,
      email: "alice@test.com",
      id: "1",
      name: "Alice Nguyen",
    },
  },
];

const ChatWindow = () => {
  const { messages, isMessagesLoading } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const displayMessages = messages.length > 0 ? messages : MOCK_MESSAGES;

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col overflow-y-auto px-4 py-3 gap-1"
      style={{ height: "calc(100% - 120px)" }}
    >
      {displayMessages.map((message) => {
        const isMe = message.sender.id === "me";
        const time = new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          hour12: false,
          minute: "2-digit",
        });

        return (
          <div
            className={`flex items-end gap-2 mb-3 ${isMe ? "justify-end" : "justify-start"}`}
            key={message.id}
          >
            {/* Avatar + timestamp for received messages */}
            {!isMe && (
              <div className="flex flex-col items-center shrink-0">
                <img
                  alt={message.sender.name}
                  className="w-7 h-7 rounded-full object-cover"
                  src={message.sender.avatar || assets.avatar}
                />
                <span className="text-[10px] text-gray-500 mt-1">{time}</span>
              </div>
            )}

            {/* Message bubble */}
            <div
              className={`max-w-[65%] px-4 py-2.5 text-sm leading-relaxed break-words
                ${
                  isMe
                    ? "bg-violet-500/40 text-white rounded-2xl rounded-br-sm"
                    : "bg-gray-700/40 text-gray-100 rounded-2xl rounded-bl-sm"
                }`}
            >
              {message.content}
            </div>

            {/* Avatar + timestamp for sent messages */}
            {isMe && (
              <div className="flex flex-col items-center shrink-0">
                <img
                  alt="Tôi"
                  className="w-7 h-7 rounded-full object-cover"
                  src={assets.avatar}
                />
                <span className="text-[10px] text-gray-500 mt-1">{time}</span>
              </div>
            )}
          </div>
        );
      })}

      <div ref={scrollRef} />
    </div>
  );
};

export default ChatWindow;
