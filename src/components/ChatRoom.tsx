import { Fragment } from "react/jsx-runtime";
import { ChatRoomIcon } from "./Icons/ChatRoomIcon";
import { SidebarItemDiv } from "./SidebarItemDiv";

export const ChatRoom = ({
  id,
  chatRoomImage,
  chatRoomTitle,
  sender,
  messageSent,
  latestSentMessageDate,
  isClicked,
  handleChatRoomClick,
}: {
  id: string;
  chatRoomImage: string;
  chatRoomTitle: string;
  sender: string;
  messageSent: string;
  latestSentMessageDate: string;
  isClicked: boolean;
  handleChatRoomClick: (id: string) => void;
}) => {
  return (
    <SidebarItemDiv
      id={id}
      handleClick={handleChatRoomClick}
      isClicked={isClicked}
    >
      <Fragment>
        <div className="flex h-cellHeight w-[77px] pl-[13px] pr-[15px] items-center">
          <ChatRoomIcon imageIcon={chatRoomImage} />
        </div>
        <div className="flex flex-col justify-center w-[399px] pr-[15px]">
          <div className="flex items-center justify-between">
            <div className="text-[17px] font-normal text-primaryStrong text-left w-auto truncate">
              <span>{chatRoomTitle}</span>
            </div>
            <div className="truncate ml-[6px] mt-[3px] text-[12px] text-chatMeta w-[62px] text-right">
              {latestSentMessageDate}
            </div>
          </div>
          <div className="flex flex-row min-h-[20px] text-[14px] text-secondaryStronger truncate font-normal w-[399px] m-t-[2px]">
            <div className="inline-flex w-auto">{sender}</div>
            <span>:&nbsp;</span>
            <span className="truncate w-auto">{messageSent}</span>
          </div>
        </div>
      </Fragment>
    </SidebarItemDiv>
  );
};
