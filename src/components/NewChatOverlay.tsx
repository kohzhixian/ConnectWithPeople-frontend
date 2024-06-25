import { SearchTextfieldPlaceholders } from "../constants/SearchTextfieldPlaceholders";
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
      <div className="h-full bg-white"></div>
    </div>
  );
};
