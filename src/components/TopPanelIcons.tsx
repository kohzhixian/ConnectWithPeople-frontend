import { ChannelsIcon } from "./ChannelsIcon";
import { CommunityIcon } from "./CommunityIcon";
import { DropDownMenuIcon } from "./DropDownMenuIcon";
import { NewChatIcon } from "./NewChatIcon";
import { StatusIcon } from "./StatusIcon";

export const TopPanelIcons = () => {
  return (
    <div className="chat-navigation-top-panel-right-div flex h-10 items-center ">
      <CommunityIcon />
      <StatusIcon />
      <ChannelsIcon />
      <NewChatIcon />
      <DropDownMenuIcon />
    </div>
  );
};
