import { BackButtonIcon } from "./Icons/BackButtonIcon";

export const SidebarOverlayHeader = ({
  handleBackButtonClicked,
}: {
  handleBackButtonClicked: () => void;
}) => {
  return (
    <div className="h-h_full_header bg-panelBackgroundColor text-white pl-[23px] pr-[20px] flex items-end">
      <div className="w-full h-59px flex items-center">
        <div className="w-[53px]">
          <BackButtonIcon handleBackButtonClicked={handleBackButtonClicked} />
        </div>
        <div className="text-[19px] font-medium mt-[-3px]">New chat</div>
      </div>
    </div>
  );
};
