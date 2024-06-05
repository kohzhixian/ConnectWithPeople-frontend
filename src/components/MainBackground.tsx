import { ReactElement } from "react";

export const MainBackground = ({ children }: { children: ReactElement }) => {
  return (
    <div className="main-background flex flex-col h-screen items-center justify-center relative">
      <div className="background-top bg-customDarkGreen h-32 w-full"></div>
      <div className="background-top bg-customLightGrey flex-grow w-full "></div>
      {children}
    </div>
  );
};
