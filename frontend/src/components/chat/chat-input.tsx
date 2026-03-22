import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useChatStore } from "@/store/use-chat-store";

const ChatInput = () => {
  const [text, setText] = useState("");
  const { selectedUser, addMessage } = useChatStore();

  const handleSend = () => {
    if (!text.trim() || !selectedUser) return;

    addMessage({
      content: text.trim(),
      conversationId: `conv-${selectedUser.id}`,
      createdAt: new Date().toISOString(),
      id: `msg-${Date.now()}`,
      sender: { email: "me@test.com", id: "me", name: "Tôi" },
    });

    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!selectedUser) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-t border-stone-500/50">
      <input
        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5
          text-white text-sm placeholder-gray-400 outline-none
          focus:border-violet-500/50 transition-colors"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nhập tin nhắn..."
        value={text}
      />
      <button
        aria-label="Gửi tin nhắn"
        className="p-2.5 rounded-xl bg-violet-500 hover:bg-violet-600
          disabled:opacity-30 disabled:cursor-not-allowed
          transition-all duration-200 cursor-pointer"
        disabled={!text.trim()}
        onClick={handleSend}
        type="button"
      >
        <IoSend className="text-white" size={18} />
      </button>
    </div>
  );
};

export default ChatInput;
