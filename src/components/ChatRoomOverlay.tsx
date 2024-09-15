import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { useGetChatroomDetailsByIdQuery } from "../services/chatroom.api";
import { useCreateMessageMutation } from "../services/message.api";
import { formattedChatroomMessageType } from "../types/chatRoomType";
import { TokenDataType } from "../types/rtkQuery/authenticationApi.type";
import { ChatroomMessage } from "./chatroomMessage";
import { AttachIcon } from "./Icons/AttachIcon";
import { Emoticon } from "./Icons/Emoticon";
import { TopPanel } from "./TopPanel";
import { TopPanelProfile } from "./TopPanelProfile";

export const ChatRoomOverlay = ({ chatroomId }: { chatroomId: string }) => {
  // constants
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode<TokenDataType>(String(token));

  //use states
  const [message, setMessage] = useState<string>("");

  // rtk query
  const {
    data: chatroomDetailsData,
    error: chatroomDetailsError,
    isLoading: chatroomDetailsIsLoading,
  } = useGetChatroomDetailsByIdQuery(chatroomId, {
    skip: !chatroomId || chatroomId === "",
  });

  const [messageData, { isLoading: isPosting }] = useCreateMessageMutation();

  const chatroomName = chatroomDetailsData
    ? Object.keys(chatroomDetailsData)[0]
    : null;

  const convertISOstringToTime = (ISOstring: string) => {
    const date = new Date(ISOstring);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  //functions
  const handleMessageInputfieldOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleMessageInputfieldOnKeydown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      try {
        const result = await messageData({
          text: message,
          chatroom_id: chatroomId,
        }).unwrap();
      } catch (err) {
        console.error(err);
      }
      setMessage("");
    }
  };

  return (
    <Fragment>
      {chatroomDetailsIsLoading ? (
        "LOADING..."
      ) : (
        <div className="flex-1 relative h-full overflow-hidden">
          <TopPanel>
            <div className="flex flex-row items-center gap-4">
              <TopPanelProfile />
              <div className="flex flex-col">
                <span className="text-base text-primaryStrong">
                  {Object.keys(chatroomDetailsData)[0]}
                </span>
                <span className="text-xs text-secondary">
                  Click here for group Info
                </span>
              </div>
            </div>
          </TopPanel>
          <div className="bg-chatroomBackground h-[90%] ">
            {chatroomDetailsData &&
              !chatroomDetailsIsLoading &&
              chatroomName &&
              chatroomDetailsData[Object.keys(chatroomDetailsData)[0]].map(
                (data: formattedChatroomMessageType) => (
                  <ChatroomMessage
                    key={data.messageId}
                    text={data.text}
                    time={convertISOstringToTime(data.updated_at)}
                    status="sent"
                    sender={data.userId}
                    currentLoggedInUser={decodedToken.userId}
                  />
                )
              )}
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
                  value={message}
                  onChange={handleMessageInputfieldOnChange}
                  onKeyDown={handleMessageInputfieldOnKeydown}
                  placeholder={!message ? "Type a message" : ""}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
