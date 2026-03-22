import { IoArrowBack } from "react-icons/io5";
import { useSocketForOnlineUsers } from "@/customHooks/use-online-users";
import { assets } from "@/lib/assets";
import { authClient } from "@/lib/auth-client";
import { useChatStore } from "@/store/use-chat-store";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { data: session } = authClient.useSession();
  const { onlineUsers } = useSocketForOnlineUsers(session?.user?.id);

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser.id);

  return (
    <div className="flex items-center gap-3 py-3 px-4 border-b border-stone-500/50">
      <button
        aria-label="Quay lại danh sách liên hệ"
        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer md:hidden"
        onClick={() => setSelectedUser(null)}
        type="button"
      >
        <IoArrowBack className="text-white" size={20} />
      </button>

      <img
        alt={selectedUser.name}
        className="w-8 h-8 rounded-full object-cover"
        src={selectedUser.avatar || assets.avatar}
      />

      <div className="flex-1 flex items-center gap-2">
        <p className="text-base font-medium text-white">{selectedUser.name}</p>
        <span
          className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-zinc-500"}`}
        />
      </div>
    </div>
  );
};

export default ChatHeader;
