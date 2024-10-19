import { Fragment } from "react/jsx-runtime";
import { TopPanel } from "./TopPanel";
import { TopPanelProfile } from "./TopPanelProfile";
import { Emoticon } from "./Icons/Emoticon";
import { AttachIcon } from "./Icons/AttachIcon";
import { TokenDataType } from "../types/rtkQuery/authenticationApi.type";
import { jwtDecode } from "jwt-decode";
import { formattedChatroomMessageType } from "../types/chatRoomType";
import { ChatroomMessage } from "./chatroomMessage";
import { useState } from "react";

export const CreateChatroomOverlay = ({
  contactName,
}: {
  contactName: string;
}) => {
  // constants
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode<TokenDataType>(String(token));

  // use states
  const [messageToDisplay, setMessageToDisplay] = useState<
    formattedChatroomMessageType[]
  >([]);

  const [messageToSent, setMessageToSent] = useState<string>("");

  // function
  const convertISOstringToTime = (ISOstring: string) => {
    const date = new Date(ISOstring);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleMessageInputfieldOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMessageToSent(event.target.value);
  };
  const handleMessageInputfieldOnKeydown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log("message sent");
    }
  };
  return (
    <Fragment>
      <div className="flex flex-col flex-1 relative h-full overflow-hidden">
        <TopPanel>
          <div className="flex flex-row items-center gap-4">
            <TopPanelProfile />
            <div className="flex flex-col">
              <span className="text-base text-primaryStrong">
                {contactName}
              </span>
              <span className="text-xs text-secondary">
                Click here for group Info
              </span>
            </div>
          </div>
        </TopPanel>
        <div className="bg-chatroomBackground overflow-auto flex-1">
          {messageToDisplay &&
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
    </Fragment>
  );
};
