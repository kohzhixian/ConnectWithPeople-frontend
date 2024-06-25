import { SearchTextfieldPlaceholders } from "../constants/SearchTextfieldPlaceholders";
import { TabButtonLabel } from "../constants/TabButtonLabel";
import { chat_room_dummy_data } from "../data/chat_room_dummy_data";
import { chatRoomInterface } from "../types/chatRoomType";
import { ChatRoom } from "./ChatRoom";
import { TopPanelIcons } from "./Icons/TopPanelIcons";
import { SearchTextfield } from "./SearchTextfield";
import { TabButton } from "./TabButton";
import { TopPanel } from "./TopPanel";
import { TopPanelProfile } from "./TopPanelProfile";

export const Sidebar = ({
  chatRoomSelected,
  handleChatRoomClick,
  handleChatIconClicked,
}: {
  chatRoomSelected: string;
  handleChatRoomClick: (id: string) => void;
  handleChatIconClicked: () => void;
}) => {
  return (
    <div className="flex-CND_flex max-w-30% flex-col overflow-hidden h-full">
      <TopPanel>
        <>
          <TopPanelProfile />
          <TopPanelIcons handleChatIconClicked={handleChatIconClicked} />
        </>
      </TopPanel>
      <div className="h-full">
        <SearchTextfield placeholder={SearchTextfieldPlaceholders.Search} />
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
  );
};
