import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { assets } from "@/lib/assets";
import { useChatStore } from "@/store/use-chat-store";

const RightSidebar = () => {
  const { selectedUser } = useChatStore();
  const navigate = useNavigate();

  if (!selectedUser) return null;

  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <div className="bg-[#1a0a2e]/10 text-white w-full relative overflow-y-auto hidden md:block">
      <div className="pt-16 flex flex-col items-center gap-3 text-center px-6">
        <img
          alt={selectedUser.name}
          className="w-20 aspect-square rounded-full object-cover"
          src={selectedUser.avatar || assets.avatar}
        />

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <p className="text-xl font-medium">{selectedUser.name}</p>
        </div>

        {selectedUser.bio && (
          <p className="text-xs text-gray-400 leading-relaxed">
            {selectedUser.bio}
          </p>
        )}
      </div>

      <hr className="border-gray-700/50 my-6 mx-6" />

      <div className="px-6 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Email</span>
          <span className="text-white">{selectedUser.email}</span>
        </div>
      </div>

      <button
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2
          px-4 py-2 rounded-lg bg-red-500/10 text-red-400 text-sm
          hover:bg-red-500/20 transition-colors cursor-pointer"
        onClick={handleSignOut}
        type="button"
      >
        <IoLogOut size={16} />
        Đăng xuất
      </button>
    </div>
  );
};

export default RightSidebar;
