import ChatContainer from "@/components/chat/chat-container";
import LeftSidebar from "@/components/chat/left-sidebar";
import RightSidebar from "@/components/chat/right-sidebar";
import EditProfileModal from "@/components/modals/edit-profile-modal";
import { useChatStore } from "@/store/use-chat-store";

const ChatPage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="w-full h-screen md:px-[1%] lg:px-[5%] xl:px-[15%] py-[3%] text-white">
      <div
        className={`
          border border-white/10 rounded-2xl backdrop-blur-2xl
          overflow-hidden h-full grid relative
          ${
            selectedUser
              ? "md:grid-cols-[1fr_1.5fr] xl:grid-cols-[1fr_2fr_1fr]"
              : "md:grid-cols-2"
          }
        `}
      >
        <LeftSidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
      <EditProfileModal />
    </div>
  );
};

export default ChatPage;
