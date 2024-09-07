import { Dispatch, SetStateAction, useEffect } from "react";
import mockImage2 from "../assets/images/mock-test-image2.jpg";
import { SearchTextfieldPlaceholders } from "../constants/SearchTextfieldPlaceholders.constants";
import { TabButtonLabel } from "../constants/TabButtonLabel.constants";
import { useGetChatroomsByUserIdQuery } from "../services/chatroom.api";
import { useGetAllMessageByChatroomIdQuery } from "../services/message.api";
import { ChatroomInterface } from "../types/reducer/chatroom.type";
import { ChatRoom } from "./ChatRoom";
import { TopPanelIcons } from "./Icons/TopPanelIcons";
import { SearchTextfield } from "./SearchTextfield";
import { TabButton } from "./TabButton";
import { TopPanel } from "./TopPanel";
import { TopPanelProfile } from "./TopPanelProfile";

export const Sidebar = ({
  selectedChatroom,
  handleChatRoomClick,
  handleChatIconClicked,
  setSelectedChatroom,
  setNewChatOverlay,
}: {
  selectedChatroom: string;
  handleChatRoomClick: (id: string) => void;
  handleChatIconClicked: () => void;
  setSelectedChatroom: Dispatch<SetStateAction<string>>;
  setNewChatOverlay: Dispatch<SetStateAction<boolean>>;
}) => {
  // rtk query
  const {
    data: chatroomData,
    error: chatroomError,
    isLoading: chatroomIsLoading,
  } = useGetChatroomsByUserIdQuery(undefined);

  const {
    data: messageData,
    error: messageError,
    isLoading: messageIsLoading,
  } = useGetAllMessageByChatroomIdQuery(selectedChatroom, {
    skip: !selectedChatroom || selectedChatroom === "",
  });

  console.log("selected chat room: ", selectedChatroom);
  console.log("message data: ", messageData);

  // functions
  const handleEscButtonPressed = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setSelectedChatroom("");
      setNewChatOverlay(false);
    }
  };

  // use effect
  useEffect(() => {
    // Add Event listner when the component mounts
    document.addEventListener("keydown", handleEscButtonPressed);

    // Cleanup event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleEscButtonPressed);
    };
  });

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
          {chatroomIsLoading || messageIsLoading
            ? "LOADING..."
            : chatroomData &&
              chatroomData.map((data: ChatroomInterface) => (
                <ChatRoom
                  key={data.id}
                  id={data.id}
                  chatRoomImage={mockImage2}
                  chatRoomTitle={data.chatroom_name}
                  latestSentMessageDate={"date"}
                  lastestMessageSentInChatroom={"message"}
                  sender={"sender"}
                  isClicked={selectedChatroom === data.id}
                  handleChatRoomClick={handleChatRoomClick}
                />
              ))}
        </div>
      </div>
    </div>
  );
};
