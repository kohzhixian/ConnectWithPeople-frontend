import { SearchTextfieldPlaceholders } from "../constants/SearchTextfieldPlaceholders.constants";
import { TabButtonLabel } from "../constants/TabButtonLabel.constants";
import { useGetChatroomsByUserIdQuery } from "../services/chatroom.api";
import { ChatroomInterface } from "../types/reducer/chatroom.type";
import { ChatRoom } from "./ChatRoom";
import { TopPanelIcons } from "./Icons/TopPanelIcons";
import { SearchTextfield } from "./SearchTextfield";
import { TabButton } from "./TabButton";
import { TopPanel } from "./TopPanel";
import { TopPanelProfile } from "./TopPanelProfile";
import mockImage2 from "../assets/images/mock-test-image2.jpg";

export const Sidebar = ({
  chatRoomSelected,
  handleChatRoomClick,
  handleChatIconClicked,
}: {
  chatRoomSelected: string;
  handleChatRoomClick: (id: string) => void;
  handleChatIconClicked: () => void;
}) => {
  // rtk query
  const {
    data: chatroomData,
    error: chatroomError,
    isLoading: chatroomIsLoading,
  } = useGetChatroomsByUserIdQuery(undefined);

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
          {chatroomIsLoading
            ? "LOADING..."
            : chatroomData.map((data: ChatroomInterface) => (
                <ChatRoom
                  key={data.id}
                  id={data.id}
                  chatRoomImage={mockImage2}
                  chatRoomTitle={data.chatroom_name}
                  latestSentMessageDate={"date"}
                  messageSent={"message"}
                  sender={"sender"}
                  isClicked={chatRoomSelected === data.id}
                  handleChatRoomClick={handleChatRoomClick}
                />
              ))}
        </div>
      </div>
    </div>
  );
};
