import { Fragment } from "react/jsx-runtime";
import { SidebarItemDiv } from "./SidebarItemDiv";
import { ChatRoomIcon } from "./Icons/ChatRoomIcon";

export const NewChatOverlayItem = ({
  newChatOverlayItemIcon,
  newChatOverlayItemLabel,
  isContact,
  handleContactsOnClick,
  id,
  isClicked,
}: {
  newChatOverlayItemIcon: string;
  newChatOverlayItemLabel: string;
  isContact: boolean;
  handleContactsOnClick?: (phoneNum: string) => void;
  id?: string;
  isClicked?: boolean;
}) => {
  return (
    <SidebarItemDiv
      id={id}
      handleClick={handleContactsOnClick}
      isClicked={isClicked}
    >
      <Fragment>
        <div className="flex h-cellHeight w-[77px] pl-[13px] pr-[15px] items-center">
          <ChatRoomIcon imageIcon={newChatOverlayItemIcon} />
        </div>
        <div className="flex flex-col justify-center w-[399px] pr-[15px]">
          <div className="text-[17px] text-primaryStrong font-normal">
            {newChatOverlayItemLabel}
          </div>
          {isContact && (
            <div className="text-[14px] font-normal text-ellipsis">Status</div>
          )}
        </div>
      </Fragment>
    </SidebarItemDiv>
  );
};
