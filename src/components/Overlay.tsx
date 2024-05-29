import { ChannelsIcon } from "./ChannelsIcon";
import { CommunityIcon } from "./CommunityIcon";
import { DropDownMenuIcon } from "./DropDownMenuIcon";
import { NewChatIcon } from "./NewChatIcon";
import { StatusIcon } from "./StatusIcon";

export const Overlay = () => {
  return (
    <div className="overlay-div absolute top-[19px] ml-19px w-overlay-width h-overlay-height bg-customWhite shadow-overlayBoxShadow ">
      <div className="overlay-inner-div flex absolute w-full h-full overflow-hidden">
        <div className="chat-navigation-div flex-CND_flex max-w-30% flex-col overflow-hidden  h-full ">
          <div className="chat-navigation-top-bar w-full py-2.5 h-59px  box-border flex items-center px-4 relative justify-between bg-topPanelBgColor ">
            <div className="chat-navigation-top-bar-left-div flex">
              <div className="profile-icon-div h-10 w-10 rounded-full cursor-pointer relative bg-blue-500"></div>
            </div>
            <div className="chat-navigation-top-bar-right-div flex h-10 items-center">
              <CommunityIcon />
              <StatusIcon />
              <ChannelsIcon />
              <NewChatIcon />
              <DropDownMenuIcon />
            </div>
          </div>
        </div>
        <div className="message-panel-div flex-1 relative h-full overflow-hidden "></div>
      </div>
    </div>
  );
};
