import { SearchIcon } from "./SearchIcon";
import { SearchTextfield } from "./SearchTextfield";
import { TopPanel } from "./TopPanel";
import { TopPanelIcons } from "./TopPanelIcons";
import { TopPanelProfile } from "./TopPanelProfile";

export const Overlay = () => {
  return (
    <div className="overlay-div absolute top-[19px] ml-19px w-overlay-width h-overlay-height bg-customWhite shadow-overlayBoxShadow ">
      <div className="overlay-inner-div flex  w-full h-full overflow-hidden">
        <div className="chat-navigation-div flex-CND_flex max-w-30% flex-col overflow-hidden  h-full ">
          <TopPanel>
            <>
              <TopPanelProfile />
              <TopPanelIcons />
            </>
          </TopPanel>
          <div className="chat-navigation-bottom-panel h-full">
            <div className="search-bar-outer-div relative box-border flex justify-start items-center h-h_pane_subheader px-3 bg-white">
              <div className="search-bar-inner-div relative flex flex-row overflow-hidden bg-searchIconBgColor rounded-lg w-full">
                <SearchIcon />
                <SearchTextfield />
              </div>
            </div>
          </div>
        </div>
        <div className="message-panel-div flex-1 relative h-full overflow-hidden ">
          <TopPanel>
            <>TESTING???</>
          </TopPanel>
        </div>
      </div>
    </div>
  );
};
