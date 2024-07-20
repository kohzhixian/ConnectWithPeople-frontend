import { Fragment } from "react/jsx-runtime";
import { SidebarItemDiv } from "./SidebarItemDiv";
import { ChatRoomIcon } from "./Icons/ChatRoomIcon";

export const NewChatOverlayItem = ({
  newChatOverlayItemIcon,
  newChatOverlayItemLabel,
  isContact,
}: {
  newChatOverlayItemIcon: string;
  newChatOverlayItemLabel: string;
  isContact: boolean;
}) => {
  return (
    <SidebarItemDiv>
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
