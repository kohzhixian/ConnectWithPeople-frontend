import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopPanel } from "./TopPanel";
import { NewChatOVerlay } from "./NewChatOverlay";
export const MainPage = () => {
  //use state
  const [chatRoomSelected, setChatRoomSelected] = useState<string>("");
  const [newChatOverlay, setNewChatOverlay] = useState<boolean>(false);

  //functions
  const handleChatRoomClick = (id: string) => {
    setChatRoomSelected(id);
  };
  const handleChatIconClicked = () => {
    setNewChatOverlay(true);
  };
  return (
    <div className="absolute mt-[19px] mb-[19px] inset-0 flex items-center justify-center">
      <div className="bg-customWhite w-full max-w-[1680px] h-full max-h-screen">
        <div className="flex w-full h-full overflow-hidden">
          {newChatOverlay ? (
            <NewChatOVerlay />
          ) : (
            <Sidebar
              chatRoomSelected={chatRoomSelected}
              handleChatRoomClick={handleChatRoomClick}
              handleChatIconClicked={handleChatIconClicked}
            />
          )}
          <div className="flex-1 relative h-full overflow-hidden">
            <TopPanel>
              <>TESTING???</>
            </TopPanel>
          </div>
        </div>
      </div>
    </div>
  );
};
