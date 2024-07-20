import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/reducers/authentication.reducer";
import { CustomButton } from "./CustomButton";
import { NewChatOverlay } from "./NewChatOverlay";
import { Sidebar } from "./Sidebar";
import { TopPanel } from "./TopPanel";
export const MainPage = () => {
  //use state
  const [chatRoomSelected, setChatRoomSelected] = useState<string>("");
  const [showNewChatOverlay, setShowNewChatOverlay] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  //use effects

  //functions
  const handleChatRoomClick = (id: string) => {
    setChatRoomSelected(id);
  };
  const handleChatIconClicked = () => {
    setShowNewChatOverlay(true);
  };

  const handleLogoutButtonClicked = () => {
    dispatch(logout());
  };

  return (
    <div className="absolute mt-[19px] mb-[19px] inset-0 flex items-center justify-center">
      <div className="bg-customWhite w-full max-w-[1680px] h-full max-h-screen">
        <div className="flex w-full h-full overflow-hidden">
          {showNewChatOverlay ? (
            <NewChatOverlay setShowNewChatOverlay={setShowNewChatOverlay} />
          ) : (
            <Sidebar
              chatRoomSelected={chatRoomSelected}
              handleChatRoomClick={handleChatRoomClick}
              handleChatIconClicked={handleChatIconClicked}
            />
          )}
          <div className="flex-1 relative h-full overflow-hidden">
            <TopPanel>
              <>TESTING???</>
            </TopPanel>
            <CustomButton
              buttonColor="bg-blue-600"
              buttonLabel="logout"
              buttonType="button"
              hoverColor="bg-red-700"
              handleButtonClicked={handleLogoutButtonClicked}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
