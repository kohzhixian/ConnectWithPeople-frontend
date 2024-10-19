import { Fragment } from "react/jsx-runtime";
import { getContactByUserIdResponseType } from "../types/rtkQuery/contactApi.type";
import { ChatRoomIcon } from "./Icons/ChatRoomIcon";
import { SidebarItemDiv } from "./SidebarItemDiv";

export const SidebarNewChatComponent = ({
  newChatOverlayItemIcon,
  newChatOverlayItemLabel,
  isContact,
  handleContactsOnClick,
  id,
  isClicked,
  selectedContact,
}: {
  newChatOverlayItemIcon: string;
  newChatOverlayItemLabel: string;
  isContact: boolean;
  handleContactsOnClick?: (contactName: string, phoneNum: number) => void;
  id?: string;
  isClicked?: boolean;
  selectedContact?: getContactByUserIdResponseType;
}) => {
  return (
    <SidebarItemDiv
      id={id}
      handleContactsOnClick={handleContactsOnClick}
      contactName={selectedContact?.contact_name}
      phoneNum={selectedContact?.contact_phone_num}
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
