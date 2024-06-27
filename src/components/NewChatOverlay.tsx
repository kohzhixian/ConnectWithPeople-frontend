import { ContactsIndicator } from "../constants/ContactsIndicator.constants";
import { NewChatOverlayItemConstants } from "../constants/NewChatOverlayItemConstants.constants";
import { SearchTextfieldPlaceholders } from "../constants/SearchTextfieldPlaceholders.constants";
import Divider from "./Divider";
import { NewChatOverlayItem } from "./NewChatOverlayItem";
import { SearchTextfield } from "./SearchTextfield";
import { SidebarOverlayHeader } from "./SidebarOverlayHeader";

export const NewChatOVerlay = ({
  setShowNewChatOverlay,
}: {
  setShowNewChatOverlay: (value: React.SetStateAction<boolean>) => void;
}) => {
  // functions
  const handleBackButtonClicked = () => {
    setShowNewChatOverlay(false);
  };
  return (
    <div className="flex-CND_flex max-w-30% flex-col overflow-hidden h-full">
      <SidebarOverlayHeader handleBackButtonClicked={handleBackButtonClicked} />
      <SearchTextfield placeholder={SearchTextfieldPlaceholders.nameOrNumber} />

      {NewChatOverlayItemConstants.map((data) => (
        <NewChatOverlayItem
          key={data.id}
          id={data.id}
          newChatOverlayItemIcon={data.newChatOverlayItemIcon}
          newChatOverlayItemLabel={data.newChatOverlayItemLabel}
        />
      ))}

      <div className="h-cellHeight w-[493px] bg-white uppercase pt-[30px] pr-0 pb-chatSpacing pl-[32px] text-panelBackgroundColor">
        {ContactsIndicator.contactsOnWhatsapp}
      </div>
      <Divider />
    </div>
  );
};
