import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";
import API from "@/lib/axios";
import { useChatStore } from "@/store/use-chat-store";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { activeConversation } = useChatStore();
  const { data: session } = authClient.useSession();

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    if (!activeConversation) return;
    if (!session?.user) return;

    setLoading(true);
    try {
      await API.post("/messages", {
        content: message.trim(),
        conversationId: activeConversation.id,
      });
      setMessage("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const isDisabled = loading || !activeConversation;

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-t border-stone-500/50">
      <input
        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5
          text-white text-sm placeholder-gray-400 outline-none
          focus:border-violet-500/50 transition-colors"
        disabled={isDisabled}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nhập tin nhắn..."
        value={message}
      />
      <button
        aria-label="Gửi tin nhắn"
        className={`p-2.5 rounded-xl bg-violet-500 hover:bg-violet-600
          disabled:opacity-30 disabled:cursor-not-allowed
          transition-all duration-200 cursor-pointer
          ${loading ? "pointer-events-none opacity-50" : ""}`}
        disabled={isDisabled}
        onClick={handleSendMessage}
        type="button"
      >
        <IoSend className="text-white" size={18} />
      </button>
    </div>
  );
};

export default ChatInput;
