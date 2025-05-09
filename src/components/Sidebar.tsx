import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import mockImage2 from "../assets/images/mock-test-image2.jpg";
import { SearchTextfieldPlaceholders } from "../constants/SearchTextfieldPlaceholders.constants";
import { TabButtonLabel } from "../constants/TabButtonLabel.constants";
import { useWebSocket } from "../hooks/WebSocketProvider";
import { useAppDispatch } from "../redux/hooks";
import { setShowChatroomOverlay } from "../redux/reducers/chatroom.reducer";
import {
  ChatroomDataType,
  createMessageSocketType,
  formattedMessageInterface,
} from "../types/chatRoomType";
import { ChatroomInterface } from "../types/reducer/chatroom.type";
import { TokenDataType } from "../types/rtkQuery/authenticationApi.type";
import { CreateChatroomRequestType } from "../types/rtkQuery/chatroomApi.type";
import { TopPanelIcons } from "./Icons/TopPanelIcons";
import { SearchTextfield } from "./SearchTextfield";
import { ChatRoom } from "./SidebarChatRoom";
import { TabButton } from "./TabButton";
import { TopPanel } from "./TopPanel";
import { TopPanelProfile } from "./TopPanelProfile";

export const Sidebar = ({
  selectedChatroomId,
  handleNewChatIconClicked,
  setSelectedChatroomId,
  latestMessageData,
  refetchLatestMessage,
  latestMessageIsLoading,
  sidebarChatroomData,
  sidebarChatroomDataIsLoading,
  refetchSidebarChatroomData,
}: {
  selectedChatroomId: string;
  handleNewChatIconClicked: () => void;
  setSelectedChatroomId: Dispatch<SetStateAction<string>>;
  latestMessageData: formattedMessageInterface[];
  refetchLatestMessage: () => void;
  latestMessageIsLoading: boolean;
  sidebarChatroomData: ChatroomDataType[];
  sidebarChatroomDataIsLoading: boolean;
  refetchSidebarChatroomData: () => void;
}) => {
  //constants
  const dispatch = useAppDispatch();
  const { socket } = useWebSocket();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode<TokenDataType>(String(token));

  // use states
  const [showDropDownMenuOptions, setShowDropDownMenuOptions] =
    useState<boolean>(false);

  const [showAddContactModal, setShowAddContactModal] =
    useState<boolean>(false);

  // use effects
  useEffect(() => {
    socket?.on("new-chatroom", (chatroomData: CreateChatroomRequestType) => {
      if (chatroomData.userPhoneNum.includes(decodedToken.phone_number)) {
        refetchSidebarChatroomData();
        refetchLatestMessage();
      }
    });

    return () => {
      socket?.off("new-chatroom");
    };
  }, [
    socket,
    decodedToken.phone_number,
    refetchSidebarChatroomData,
    sidebarChatroomData,
    latestMessageData,
    selectedChatroomId,
  ]);

  // functions
  const handleChatRoomClick = (id: string) => {
    setSelectedChatroomId(id);
    dispatch(setShowChatroomOverlay(true));
  };

  const handleDropDownMenuClicked = () => {
    setShowDropDownMenuOptions((prev) => !prev);
  };

  const handleReceiveMessage = () => {
    refetchLatestMessage();
  };

  // refetch latest message data when chatroom is not opened for user receiving message
  useEffect(() => {
    socket?.on("receive-message", handleReceiveMessage);

    return () => {
      socket?.off("receive-message", handleReceiveMessage);
    };
  }, [socket]);

  const renderLatestMessage = (chatroomId: string) => {
    let latestMessageDetails: formattedMessageInterface | null | undefined =
      null;
    if (latestMessageData && latestMessageData.length !== 0) {
      latestMessageDetails = latestMessageData.find(
        (data: formattedMessageInterface) => data.chatroom_id === chatroomId
      );
    }

    const currentDate = dayjs(new Date());

    const latestMessageDate = dayjs(latestMessageDetails?.date);

    const clonedLatestMessageDetails = { ...latestMessageDetails };
    if (currentDate.isSame(latestMessageDate, "day")) {
      clonedLatestMessageDetails.date = "Today";
    } else if (currentDate.isSame(latestMessageDate.add(1, "day"), "day")) {
      clonedLatestMessageDetails.date = "Yesterday";
    } else {
      clonedLatestMessageDetails.date = dayjs(
        latestMessageDetails?.date
      ).format("DD/MM/YYYY");
    }

    if (clonedLatestMessageDetails) {
      return {
        message: clonedLatestMessageDetails.message,
        sender: clonedLatestMessageDetails.sender,
        date: clonedLatestMessageDetails.date,
      };
    }

    return {
      message: "",
      sender: "",
      date: "",
    };
  };

  return (
    <div className="flex-CND_flex max-w-30% flex-col overflow-hidden h-full">
      <TopPanel>
        <>
          <TopPanelProfile />
          <TopPanelIcons
            handleNewChatIconClicked={handleNewChatIconClicked}
            handleDropDownMenuClicked={handleDropDownMenuClicked}
            showDropDownMenuOptions={showDropDownMenuOptions}
            setShowDropDownMenuOptions={setShowDropDownMenuOptions}
            showAddContactModal={showAddContactModal}
            setShowAddContactModal={setShowAddContactModal}
          />
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
          {sidebarChatroomDataIsLoading || latestMessageIsLoading
            ? "LOADING..."
            : sidebarChatroomData &&
              sidebarChatroomData.map((data: ChatroomInterface) => {
                const { message, sender, date } = renderLatestMessage(data.id);
                return (
                  <ChatRoom
                    key={data.id}
                    id={data.id}
                    chatRoomImage={mockImage2}
                    chatRoomTitle={data.chatroom_name}
                    latestSentMessageDate={date}
                    lastestMessageSentInChatroom={message}
                    sender={sender}
                    isClicked={selectedChatroomId === data.id}
                    handleChatRoomClick={handleChatRoomClick}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
};
