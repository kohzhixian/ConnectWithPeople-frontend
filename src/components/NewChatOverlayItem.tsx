import { Fragment } from "react/jsx-runtime";
import { SidebarItemDiv } from "./SidebarItemDiv";
import { ChatRoomIcon } from "./Icons/ChatRoomIcon";

export const NewChatOverlayItem = ({
  newChatOverlayItemIcon,
  newChatOverlayItemLabel,
}: {
  newChatOverlayItemIcon: string;
  newChatOverlayItemLabel: string;
}) => {
  return (
    <SidebarItemDiv>
      <Fragment>
        <div className="flex h-cellHeight w-[77px] pl-[13px] pr-[15px] items-center">
          <ChatRoomIcon imageIcon={newChatOverlayItemIcon} />
        </div>
        <div className="flex flex-col justify-center w-[399px] pr-[15px] border-b border-gray-200">
          {newChatOverlayItemLabel}
        </div>
      </Fragment>
    </SidebarItemDiv>
  );
};
