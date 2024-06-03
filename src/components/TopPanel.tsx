import { ReactElement } from "react";

export const TopPanel = ({ children }: { children: ReactElement }) => {
  return (
    <div className="chat-navigation-top-panel w-full py-2.5 h-59px  box-border flex items-center px-4 relative justify-between bg-topPanelBgColor ">
      {children}
    </div>
  );
};
