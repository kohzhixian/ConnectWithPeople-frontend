import { Dispatch, SetStateAction, useEffect } from "react";
import mockImage2 from "../assets/images/mock-test-image2.jpg";
import { SearchTextfieldPlaceholders } from "../constants/SearchTextfieldPlaceholders.constants";
import { TabButtonLabel } from "../constants/TabButtonLabel.constants";
import { useGetChatroomsByUserIdQuery } from "../services/chatroom.api";
import {
  useGetAllMessageByChatroomIdQuery,
  useGetAllMessageLinkedToUserQuery,
  useGetLatestMsgForAllChatroomLinkedToUserQuery,
} from "../services/message.api";
import { formattedMessageInterface } from "../types/chatRoomType";
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
    data: individualChatroomMessageData,
    error: individualChatroomMessageError,
    isLoading: individualChatroomMessageIsLoading,
  } = useGetAllMessageByChatroomIdQuery(selectedChatroom, {
    skip: !selectedChatroom || selectedChatroom === "",
  });

  const {
    data: allMessageData,
    error: allMessageError,
    isLoading: allMessageIsLoading,
  } = useGetAllMessageLinkedToUserQuery(undefined);

  const {
    data: latestMessageData,
    error: latestMessageError,
    isLoading: latestMessageIsLoading,
  } = useGetLatestMsgForAllChatroomLinkedToUserQuery(undefined);
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

  // functions
  const renderLatestMessage = (chatroomId: string) => {
    let latestMessage: string = "";
    latestMessageData.map((data: formattedMessageInterface) => {
      if (data.chatroom_id === chatroomId && data.message) {
        latestMessage = data.message;
      }
    });
    return latestMessage;
  };

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
          {chatroomIsLoading || latestMessageIsLoading
            ? "LOADING..."
            : chatroomData &&
              chatroomData.map((data: ChatroomInterface) => (
                <ChatRoom
                  key={data.id}
                  id={data.id}
                  chatRoomImage={mockImage2}
                  chatRoomTitle={data.chatroom_name}
                  latestSentMessageDate={"date"}
                  lastestMessageSentInChatroom={renderLatestMessage(data.id)}
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
