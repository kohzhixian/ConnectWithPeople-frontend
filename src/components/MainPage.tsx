import { useEffect, useState } from "react";
import { WebSocketProvider } from "../hooks/WebSocketProvider";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setShowChatroomOverlay,
  setShowCreateChatroomOverlay,
  setShowSidebarNewChatOverlay,
} from "../redux/reducers/chatroom.reducer";
import { useGetLatestMsgForAllChatroomLinkedToUserQuery } from "../services/message.api";
import { getContactByUserIdResponseType } from "../types/rtkQuery/contactApi.type";
import { ChatRoomOverlay } from "./ChatRoomOverlay";
import { NoChatroomOpenedDiv } from "./NoChatroomOpenedDiv";
import { Sidebar } from "./Sidebar";
import { SidebarNewChat } from "./SidebarNewChat";
import { useGetChatroomsByUserIdQuery } from "../services/chatroom.api";
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
  useEffect(() => {
    // Add Event listner when the component mounts
    document.addEventListener("keydown", handleEscButtonPressed);

    // Cleanup event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleEscButtonPressed);
    };
  });

  //functions
  const handleNewChatIconClicked = () => {
    dispatch(setShowSidebarNewChatOverlay(true));
  };

  const handleEscButtonPressed = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setSelectedChatroomId("");
      dispatch(setShowChatroomOverlay(false));
      dispatch(setShowCreateChatroomOverlay(false));
      dispatch(setShowSidebarNewChatOverlay(false));
    }
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

  const {
    data: sidebarChatroomData,
    error: chatroomError,
    isLoading: sidebarChatroomDataIsLoading,
    refetch: refetchSidebarChatroomData,
  } = useGetChatroomsByUserIdQuery(undefined);
  useEffect(() => {
    refetchLatestMessage();
    refetchSidebarChatroomData();
  }, [sidebarChatroomData]);
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
              handleNewChatIconClicked={handleNewChatIconClicked}
              setSelectedChatroomId={setSelectedChatroomId}
              latestMessageData={latestMessageData!}
              refetchLatestMessage={refetchLatestMessage}
              latestMessageIsLoading={latestMessageIsLoading}
              sidebarChatroomData={sidebarChatroomData}
              sidebarChatroomDataIsLoading={sidebarChatroomDataIsLoading}
              refetchSidebarChatroomData={refetchSidebarChatroomData}
            />
          )}
          {showChatroomOverlay || showCreateChatroomOverlay ? (
            <ChatRoomOverlay
              selectedChatroomId={selectedChatroomId}
              setSelectedChatroomId={setSelectedChatroomId}
              refetchLatestMessage={refetchLatestMessage}
              selectedContact={selectedContact}
              isCreate={showCreateChatroomOverlay}
              refetchSidebarChatroomData={refetchSidebarChatroomData}
            />
          ) : (
            <NoChatroomOpenedDiv />
          )}
        </div>
      </div>
    </div>
  );
};
