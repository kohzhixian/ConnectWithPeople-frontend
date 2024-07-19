import { Fragment } from "react/jsx-runtime";
import { SidebarItemDiv } from "./SidebarItemDiv";
import Divider from "./Divider";
import { ContactSeparatorDivType } from "../types/chatRoomType";

export const ContactSeparatorDiv = ({ label }: ContactSeparatorDivType) => {
  return (
    <Fragment>
      <SidebarItemDiv>
        <div className="pl-[32px] pt-[30px] pb-[15px]">{label}</div>
      </SidebarItemDiv>
      <Divider />
    </Fragment>
  );
};
