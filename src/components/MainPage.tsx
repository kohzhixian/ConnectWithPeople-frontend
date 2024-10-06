import { useState } from "react";
import { WebSocketProvider } from "../hooks/WebSocketProvider";
import { ChatRoomOverlay } from "./ChatRoomOverlay";
import { NewChatOverlay } from "./NewChatOverlay";
import { NoChatroomOpenedDiv } from "./NoChatroomOpenedDiv";
import { Sidebar } from "./Sidebar";
export const MainPage = () => {
  //use state
  const [selectedChatroomId, setSelectedChatroomId] = useState<string>("");
  const [showNewChatSidebarOverlay, setShowNewChatSidebarOverlay] =
    useState<boolean>(false);
  const [chatroomOverlay, setChatroomOverlay] = useState<boolean>(false);
  //use effects

  //functions
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
              selectedChatroomId={selectedChatroomId}
              handleChatIconClicked={handleNewChatIconClicked}
              setSelectedChatroomId={setSelectedChatroomId}
              setChatroomOverlay={setChatroomOverlay}
            />
          )}
          {chatroomOverlay ? (
            <WebSocketProvider>
              <ChatRoomOverlay chatroomId={selectedChatroomId} />
            </WebSocketProvider>
          ) : (
            <NoChatroomOpenedDiv />
          )}
        </div>
      </div>
    </div>
  );
};
