import { ContactsIndicator } from "../constants/ContactsIndicator.constants";
import { NewChatOverlayItemConstants } from "../constants/NewChatOverlayItemConstants.constants";
import { SearchTextfieldPlaceholders } from "../constants/SearchTextfieldPlaceholders.constants";
import { ContactSeparatorDiv } from "./ContactsSeparatorDiv";
import Divider from "./Divider";
import { NewChatOverlayItem } from "./NewChatOverlayItem";
import { SearchTextfield } from "./SearchTextfield";
import { SidebarOverlayHeader } from "./SidebarOverlayHeader";

export const NewChatOverlay = ({
  setShowNewChatOverlay,
}: {
  setShowNewChatOverlay: (value: React.SetStateAction<boolean>) => void;
}) => {
  // functions
  const handleBackButtonClicked = () => {
    setShowNewChatOverlay(false);
  };
  return (
    <div className="flex flex-CND_ max-w-30% flex-col  h-full">
      <SidebarOverlayHeader handleBackButtonClicked={handleBackButtonClicked} />
      <SearchTextfield placeholder={SearchTextfieldPlaceholders.nameOrNumber} />

      <div className="flex-1 w-full overflow-y-scroll overflow-x-hidden">
        {NewChatOverlayItemConstants.map((data) => (
          <NewChatOverlayItem
            key={data.id}
            newChatOverlayItemIcon={data.newChatOverlayItemIcon}
            newChatOverlayItemLabel={data.newChatOverlayItemLabel}
          />
        ))}

        <div className="h-cellHeight w-[493px] bg-white uppercase pt-[30px] pr-0 pb-chatSpacing pl-[32px] text-panelBackgroundColor">
          {ContactsIndicator.contactsOnWhatsapp}
        </div>
        <Divider />
        {ContactsIndicator.ChatRoomDividerLabels.map((data) => (
          <ContactSeparatorDiv key={data.key} label={data.key} />
        ))}
      </div>
    </div>
  );
};
