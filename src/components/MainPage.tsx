import { useState } from "react";
import { WebSocketProvider } from "../hooks/WebSocketProvider";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useGetLatestMsgForAllChatroomLinkedToUserQuery } from "../services/message.api";
import { getContactByUserIdResponseType } from "../types/rtkQuery/contactApi.type";
import { ChatRoomOverlay } from "./ChatRoomOverlay";
import { CreateChatroomOverlay } from "./CreateChatroomOverlay";
import { NoChatroomOpenedDiv } from "./NoChatroomOpenedDiv";
import { Sidebar } from "./Sidebar";
import { SidebarNewChat } from "./SidebarNewChat";
import { setShowSidebarNewChatOverlay } from "../redux/reducers/chatroom.reducer";
export const MainPage = () => {
  //constants
  const dispatch = useAppDispatch();
  const chatroomSelector = useAppSelector((state) => state.chatroom);
  const showChatroomOverlay = chatroomSelector.showChatroomOverlay;
  const showCreateChatroomOverlay = chatroomSelector.showCreateChatroomOverlay;
  const showSidebarNewChatOverlay = chatroomSelector.showSidebarNewChatOverlay;

  //use state
  const [selectedChatroomId, setSelectedChatroomId] = useState<string>("");
  const [selectedContact, setSelectedContact] =
    useState<getContactByUserIdResponseType>({
      contact_name: "",
      contact_phone_num: 0,
    });

  //use effects

  //functions
  const handleNewChatIconClicked = () => {
    dispatch(setShowSidebarNewChatOverlay(true));
  };

  // const handleLogoutButtonClicked = () => {
  //   dispatch(logout());
  // };

  // rtk Query
  const {
    data: latestMessageData,
    error: latestMessageError,
    isLoading: latestMessageIsLoading,
    refetch: refetchLatestMessage,
  } = useGetLatestMsgForAllChatroomLinkedToUserQuery(null);

  return (
    <div className="absolute mt-[19px] mb-[19px] inset-0 flex items-center justify-center">
      <div className="bg-customWhite w-full max-w-[1680px] h-full max-h-screen">
        <div className="flex w-full h-full overflow-hidden items-center justify-center">
          {showSidebarNewChatOverlay ? (
            <SidebarNewChat
              selectedContact={selectedContact}
              setSelectedContact={setSelectedContact}
            />
          ) : (
            <Sidebar
              selectedChatroomId={selectedChatroomId}
              handleChatIconClicked={handleNewChatIconClicked}
              setSelectedChatroomId={setSelectedChatroomId}
              latestMessageData={latestMessageData!}
              latestMessageIsLoading={latestMessageIsLoading}
            />
          )}
          {showChatroomOverlay ? (
            <WebSocketProvider>
              <ChatRoomOverlay
                chatroomId={selectedChatroomId}
                refetchLatestMessage={refetchLatestMessage}
              />
            </WebSocketProvider>
          ) : showCreateChatroomOverlay ? (
            <CreateChatroomOverlay contactName={selectedContact.contact_name} />
          ) : (
            <NoChatroomOpenedDiv />
          )}
        </div>
      </div>
    </div>
  );
};
