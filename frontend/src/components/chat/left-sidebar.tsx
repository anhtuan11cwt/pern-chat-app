import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoChatbubbles, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSocketForOnlineUsers } from "@/customHooks/use-online-users";
import { useUsers } from "@/customHooks/useUsers";
import { authClient } from "@/lib/auth-client";
import API from "@/lib/axios";
import type { User } from "@/lib/types";
import { useChatStore } from "@/store/use-chat-store";
import { useEditProfileStore } from "@/store/use-edit-profile-store";
import ChatUser from "./chat-user";
import LoadingUsers from "./loading-users";

const LeftSidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    selectedUser,
    setSelectedUser,
    setActiveConversation,
    isConversationLoading,
    setConversationLoading,
  } = useChatStore();
  const { open } = useEditProfileStore();
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const { onlineUsers } = useSocketForOnlineUsers(session?.user?.id);

  const { users, loading } = useUsers(searchQuery);

  const handleStartConversation = async (user: User) => {
    if (isConversationLoading) return;
    if (selectedUser?.id === user.id) return;

    setConversationLoading(true);
    try {
      const res = await API.post(`/conversations/${user.id}`);
      setSelectedUser(user);
      setActiveConversation(res.data);
    } catch (err) {
      console.error("Start conversation error:", err);
    } finally {
      setConversationLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      useChatStore.getState().setSelectedUser(null);
      useChatStore.getState().setActiveConversation(null);
      useChatStore.getState().setMessages([]);
      navigate("/");
    } catch (error) {
      console.error("[LeftSignOut] Error:", error);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1a0a2e]/30 relative">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <IoChatbubbles className="text-violet-500" size={28} />
          <h1 className="text-lg font-semibold text-white">ChatApp</h1>
        </div>

        <div className="relative">
          <button
            aria-label="Trình đơn"
            className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            type="button"
          >
            <BsThreeDotsVertical className="text-gray-400" size={18} />
          </button>

          {dropdownOpen && (
            <>
              <button
                aria-label="Đóng trình đơn"
                className="fixed inset-0 z-10 cursor-default"
                onClick={() => setDropdownOpen(false)}
                type="button"
              />
              <div className="absolute top-full right-0 mt-1 z-20 w-36 py-2 rounded-lg bg-[#1a0a2e] border border-gray-600 shadow-xl">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => {
                    open();
                    setDropdownOpen(false);
                  }}
                  type="button"
                >
                  Hồ sơ
                </button>
                <hr className="my-1 border-gray-700" />
                <button
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={handleSignOut}
                  type="button"
                >
                  Đăng xuất
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="px-4 mb-2">
        <div className="bg-[#1a0a2e]/50 rounded-lg flex items-center gap-2 py-2.5 px-4">
          <IoSearch className="text-gray-400 shrink-0" size={18} />
          <input
            className="bg-transparent border-none text-white text-sm outline-none placeholder-gray-400 flex-1"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm người dùng..."
            value={searchQuery}
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {loading && <LoadingUsers />}

        {!loading && users.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-16 text-center px-4">
            <IoSearch className="text-gray-500 mb-2" size={28} />
            <p className="text-sm font-medium text-gray-300">
              Không tìm thấy người dùng
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Không có kết quả cho &quot;{searchQuery}&quot;
            </p>
          </div>
        )}

        {!loading &&
          users.length > 0 &&
          users.map((user) => {
            const isOnline = onlineUsers.includes(user.id);

            return (
              <ChatUser
                avatar={user.avatar}
                key={user.id}
                name={user.name}
                onClick={() => handleStartConversation(user)}
                online={isOnline}
                selected={user.id === selectedUser?.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default LeftSidebar;
