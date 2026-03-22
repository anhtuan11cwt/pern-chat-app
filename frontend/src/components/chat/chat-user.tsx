import { assets } from "@/lib/assets";

interface ChatUserProps {
  avatar?: string;
  name: string;
  onClick?: () => void;
  online?: boolean;
  selected?: boolean;
}

const ChatUser = ({
  name,
  avatar,
  online,
  selected,
  onClick,
}: ChatUserProps) => {
  return (
    <button
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#28142e]/50 w-full text-left
        ${selected ? "bg-[#28142e]/80" : ""}`}
      onClick={onClick}
      type="button"
    >
      <div className="relative shrink-0">
        <img
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
          src={avatar || assets.avatar}
        />
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-zinc-900
            ${online ? "bg-green-500" : "bg-zinc-500"}`}
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-sm font-medium text-white truncate">{name}</span>
        <span className="text-xs text-zinc-400">
          {online ? "Trực tuyến" : "Ngoại tuyến"}
        </span>
      </div>
    </button>
  );
};

export default ChatUser;
