import { Dispatch, SetStateAction } from "react";
import { ChannelsIcon } from "./ChannelsIcon";
import { CommunityIcon } from "./CommunityIcon";
import { DropDownMenuIcon } from "./DropDownMenuIcon";
import { NewChatIcon } from "./NewChatIcon";
import { StatusIcon } from "./StatusIcon";

export const TopPanelIcons = ({
  handleNewChatIconClicked,
  handleDropDownMenuClicked,
  showDropDownMenuOptions,
  setShowDropDownMenuOptions,
}: {
  handleNewChatIconClicked: () => void;
  handleDropDownMenuClicked: () => void;
  showDropDownMenuOptions: boolean;
  setShowDropDownMenuOptions: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="chat-navigation-top-panel-right-div flex h-10 items-center ">
      <CommunityIcon />
      <StatusIcon />
      <ChannelsIcon />
      <NewChatIcon handleNewChatIconClicked={handleNewChatIconClicked} />
      <DropDownMenuIcon
        handleDropDownMenuClicked={handleDropDownMenuClicked}
        showDropDownMenuOptions={showDropDownMenuOptions}
        setShowDropDownMenuOptions={setShowDropDownMenuOptions}
      />
    </div>
  );
};
