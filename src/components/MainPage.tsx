import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/reducers/authentication.reducer";
import { CustomButton } from "./CustomButton";
import { NewChatOverlay } from "./NewChatOverlay";
import { Sidebar } from "./Sidebar";
import { TopPanel } from "./TopPanel";
import { NoChatroomOpenedDiv } from "./NoChatroomOpenedDiv";
import { ChatRoomOverlay } from "./ChatRoomOverlay";
export const MainPage = () => {
  //use state
  const [chatRoomSelected, setChatRoomSelected] = useState<string>("");
  const [showNewChatSidebarOverlay, setShowNewChatSidebarOverlay] =
    useState<boolean>(false);
  const [showNewChatOverlay, setNewChatOverlay] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  //use effects

  //functions
  const handleChatRoomClick = (id: string) => {
    setChatRoomSelected(id);
    setNewChatOverlay(true);
  };
  const handleNewChatIconClicked = () => {
    setShowNewChatSidebarOverlay(true);
  };

  // const handleLogoutButtonClicked = () => {
  //   dispatch(logout());
  // };

  return (
    <div className="absolute mt-[19px] mb-[19px] inset-0 flex items-center justify-center">
      <div className="bg-customWhite w-full max-w-[1680px] h-full max-h-screen">
        <div className="flex w-full h-full overflow-hidden items-center justify-center">
          {showNewChatSidebarOverlay ? (
            <NewChatOverlay
              setShowNewChatOverlay={setShowNewChatSidebarOverlay}
            />
          ) : (
            <Sidebar
              chatRoomSelected={chatRoomSelected}
              handleChatRoomClick={handleChatRoomClick}
              handleChatIconClicked={handleNewChatIconClicked}
            />
          )}
          {showNewChatOverlay ? <ChatRoomOverlay /> : <NoChatroomOpenedDiv />}
        </div>
      </div>
    </div>
  );
};
