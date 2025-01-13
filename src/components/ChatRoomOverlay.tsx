import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { useWebSocket } from "../hooks/WebSocketProvider";
import {
  useCreateChatroomMutation,
  useGetChatroomDetailsByIdQuery,
} from "../services/chatroom.api";
import { useCreateMessageMutation } from "../services/message.api";
import {
  createMessageSocketType,
  formattedChatroomMessageType,
} from "../types/chatRoomType";
import { TokenDataType } from "../types/rtkQuery/authenticationApi.type";
import { getContactByUserIdResponseType } from "../types/rtkQuery/contactApi.type";
import { ChatroomMessage } from "./chatroomMessage";
import { AttachIcon } from "./Icons/AttachIcon";
import { Emoticon } from "./Icons/Emoticon";
import { TopPanel } from "./TopPanel";
import { TopPanelProfile } from "./TopPanelProfile";

export const ChatRoomOverlay = ({
  selectedChatroomId,
  setSelectedChatroomId,
  refetchLatestMessage,
  selectedContact,
  isCreate,
  refetchSidebarChatroomData,
}: {
  selectedChatroomId: string;
  setSelectedChatroomId: Dispatch<SetStateAction<string>>;
  refetchLatestMessage: () => void;
  selectedContact: getContactByUserIdResponseType;
  isCreate: boolean;
  refetchSidebarChatroomData: () => void;
}) => {
  // constants
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode<TokenDataType>(String(token));

  const { socket } = useWebSocket();

  // use states
  const [messageToSent, setMessageToSent] = useState<string>("");
  const [messageToDisplay, setMessageToDisplay] = useState<
    formattedChatroomMessageType[]
  >([]);
  // rtk query
  const {
    data: chatroomDetailsData,
    error: chatroomDetailsError,
    isLoading: chatroomDetailsIsLoading,
    refetch: refetchChatroomDetails,
  } = useGetChatroomDetailsByIdQuery(selectedChatroomId || "", {
    skip: !selectedChatroomId,
  });

  const [messageData, { isLoading: isPosting }] = useCreateMessageMutation();

  const [createChatroomData, { isLoading: isCreating }] =
    useCreateChatroomMutation();

  const chatroomName = chatroomDetailsData
    ? Object.keys(chatroomDetailsData)[0]
    : null;
  // use effects
  useEffect(() => {
    //listens for new message from the websocket server
    socket?.on("send-message", (newMessage) => {
      displayMessage(newMessage);
    });

    socket?.on("receive-message", (message) => {
      displayMessage(message);
    });

    socket?.emit("join-room", selectedChatroomId);

    return () => {
      socket?.off("send-message", () => {});
      socket?.off("receive-message", () => {});
    };
  }, [socket, selectedChatroomId]);

  useEffect(() => {
    if (chatroomDetailsData && !chatroomDetailsIsLoading) {
      const formattedChatroomMessage: formattedChatroomMessageType[] =
        chatroomDetailsData[Object.keys(chatroomDetailsData)[0]];

      setMessageToDisplay(formattedChatroomMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatroomDetailsData]);

  // functions
  const convertISOstringToTime = (ISOstring: string) => {
    const date = new Date(ISOstring);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleMessageInputfieldOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMessageToSent(event.target.value);
  };

  const handleMessageInputfieldOnKeydown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (isCreate) {
        try {
          const userPhoneNumArray: number[] = [];
          userPhoneNumArray.push(
            selectedContact.contact_phone_num,
            decodedToken.phone_number
          );

          const response = await createChatroomData({
            chatroom_name: selectedContact.contact_name,
            chatroom_icon: "chatroom icon",
            userPhoneNum: userPhoneNumArray,
          }).unwrap();

          if (response) {
            socket?.emit(
              "new-chatroom",
              {
                chatroom_name: selectedContact.contact_name,
                chatroom_icon: "chatroom icon",
                userPhoneNum: userPhoneNumArray,
              },
              selectedChatroomId
            );

            const messageResponse = await messageData({
              text: messageToSent,
              chatroom_id: response.chatroomId,
            }).unwrap();
            if (messageResponse) {
              socket?.emit(
                "send-message",
                {
                  text: messageToSent,
                  status: "sent",
                  updated_at: dayjs(new Date()).toISOString(),
                  username: decodedToken.username,
                  messageId: messageResponse.messageId,
                  userId: decodedToken.userId,
                  chatroomId: selectedChatroomId,
                },
                selectedChatroomId
              );
            }
          }
          setSelectedChatroomId(response.chatroomId);
          setMessageToSent("");
          refetchSidebarChatroomData();
          refetchLatestMessage();
        } catch (err) {
          console.error(err);
        }
      } else {
        try {
          const messageResponse = await messageData({
            text: messageToSent,
            chatroom_id: selectedChatroomId,
          }).unwrap();

          if (messageResponse) {
            // follows the request type needed in the backend
            socket?.emit(
              "send-message",
              {
                text: messageToSent,
                status: "sent",
                updated_at: dayjs(new Date()).toISOString(),
                username: decodedToken.username,
                messageId: messageResponse.messageId,
                userId: decodedToken.userId,
                chatroomId: selectedChatroomId,
              },
              selectedChatroomId
            );
            refetchChatroomDetails();
            refetchLatestMessage();
          } else {
            console.error("Failed to send message");
          }
        } catch (err) {
          console.error(err);
        }
      }
      setMessageToSent("");
    }
  };

  const displayMessage = (newMessage: createMessageSocketType) => {
    const result = {
      text: newMessage.text,
      status: newMessage.status,
      updated_at: newMessage.updated_at,
      username: newMessage.username,
      messageId: newMessage.messageId,
      userId: newMessage.userId,
    };
    setMessageToDisplay((prev) => {
      return [...prev, result];
    });
  };

  return (
    <Fragment>
      {chatroomDetailsIsLoading ? (
        "LOADING..."
      ) : (
        <div className="flex flex-col flex-1 relative h-full overflow-hidden">
          <TopPanel>
            <div className="flex flex-row items-center gap-4">
              <TopPanelProfile />
              <div className="flex flex-col">
                <span className="text-base text-primaryStrong">
                  {!isCreate
                    ? Object.keys(chatroomDetailsData)[0]
                    : selectedContact.contact_name}
                </span>
                <span className="text-xs text-secondary">
                  Click here for group Info
                </span>
              </div>
            </div>
          </TopPanel>
          <div className="bg-chatroomBackground overflow-auto flex-1">
            {chatroomDetailsData &&
              !chatroomDetailsIsLoading &&
              chatroomName &&
              messageToDisplay.map((data: formattedChatroomMessageType) => (
                <ChatroomMessage
                  key={data.messageId}
                  text={data.text}
                  time={convertISOstringToTime(data.updated_at)}
                  status="sent"
                  sender={data.userId}
                  currentLoggedInUser={decodedToken.userId}
                />
              ))}
          </div>
          <div className="flex max-w-full min-h-[62px] px-4 pb-[5px] bg-backgroundDefaultActive">
            <div className="flex items-center w-[88px] h-auto">
              <div className="mx-2 w-[26px]">
                <Emoticon />
              </div>
              <div className="p-2">
                <AttachIcon />
              </div>
            </div>
            <div className="mx-2 my-[5px] w-full h-[52px] flex items-center">
              <form className="w-full">
                <input
                  className="flex w-full  px-3 py-[9px] rounded-[8px] border border-white focus:outline-none"
                  id="messageInputField"
                  type="text"
                  value={messageToSent}
                  onChange={handleMessageInputfieldOnChange}
                  onKeyDown={handleMessageInputfieldOnKeydown}
                  placeholder={!messageToSent ? "Type a message" : ""}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
