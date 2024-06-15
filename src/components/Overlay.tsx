import { useState } from "react";
import { TabButtonLabel } from "../constants/TabButtonLabel";
import { chat_room_dummy_data } from "../data/chat_room_dummy_data";
import { chatRoomInterface } from "../types/chatRoomType";
import { ChatRoom } from "./ChatRoom";
import { SearchIcon } from "./SearchIcon";
import { SearchTextfield } from "./SearchTextfield";
import { TabButton } from "./TabButton";
import { TopPanel } from "./TopPanel";
import { TopPanelIcons } from "./TopPanelIcons";
import { TopPanelProfile } from "./TopPanelProfile";
export const Overlay = () => {
  //use state
  const [chatRoomSelected, setChatRoomSelected] = useState<string>("");

  //functions
  const handleChatRoomClick = (id: string) => {
    setChatRoomSelected(id);
  };
  return (
    <div className="absolute mt-[19px] mb-[19px] inset-0 flex items-center justify-center">
      <div className="bg-customWhite w-full max-w-[1680px] h-full max-h-screen">
        <div className="flex w-full h-full overflow-hidden">
          <div className="flex-CND_flex max-w-30% flex-col overflow-hidden h-full">
            <TopPanel>
              <>
                <TopPanelProfile />
                <TopPanelIcons />
              </>
            </TopPanel>
            <div className="h-full">
              <div className="relative box-border flex justify-start items-center h-h_pane_subheader px-3 bg-white">
                <div className="relative flex flex-row overflow-hidden bg-backgroundDefaultActive rounded-lg w-full">
                  <SearchIcon />
                  <SearchTextfield />
                </div>
              </div>
              <div className="relative box-border flex flex-row px-4 gap-x-2 bg-white h-[42px] border-b border-b-1 border-[#e7fce3] p-t-[2px] p-b-[7px]">
                <TabButton
                  isActive={true}
                  tabButtonLabel={TabButtonLabel.allButtonLabel}
                />
                <TabButton
                  isActive={false}
                  tabButtonLabel={TabButtonLabel.unreadButtonLabel}
                />
                <TabButton
                  isActive={false}
                  tabButtonLabel={TabButtonLabel.groupsButtonLabel}
                />
              </div>
              <div className="w-full h-full overflow-y-scroll">
                {chat_room_dummy_data.map((data: chatRoomInterface) => (
                  <ChatRoom
                    key={data.key}
                    id={data.key}
                    chatRoomImage={data.chatRoomImage}
                    chatRoomTitle={data.chatRoomTitle}
                    dateMessageWasSent={data.dateMessageWasSent}
                    messageSent={data.messageSent}
                    sender={data.sender}
                    isClicked={chatRoomSelected === data.key}
                    handleChatRoomClick={handleChatRoomClick}
                  />
                ))}
              </div>
            </div>
          </div>
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
