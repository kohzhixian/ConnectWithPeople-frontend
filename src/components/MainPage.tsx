import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { ChatRoomOverlay } from "./ChatRoomOverlay";
import { NewChatOverlay } from "./NewChatOverlay";
import { NoChatroomOpenedDiv } from "./NoChatroomOpenedDiv";
import { Sidebar } from "./Sidebar";
export const MainPage = () => {
  //use state
  const [selectedChatroom, setSelectedChatroom] = useState<string>("");
  const [showNewChatSidebarOverlay, setShowNewChatSidebarOverlay] =
    useState<boolean>(false);
  const [showNewChatOverlay, setNewChatOverlay] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  //use effects

  //functions
  const handleChatRoomClick = (id: string) => {
    setSelectedChatroom(id);
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
              selectedChatroom={selectedChatroom}
              handleChatRoomClick={handleChatRoomClick}
              handleChatIconClicked={handleNewChatIconClicked}
              setSelectedChatroom={setSelectedChatroom}
              setNewChatOverlay={setNewChatOverlay}
            />
          )}
          {showNewChatOverlay ? <ChatRoomOverlay /> : <NoChatroomOpenedDiv />}
        </div>
      </div>
    </div>
  );
};
