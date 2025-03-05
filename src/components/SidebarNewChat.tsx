import { jwtDecode } from "jwt-decode";
import { Dispatch, Fragment, SetStateAction } from "react";
import mockImage2 from "../assets/images/mock-test-image2.jpg";
import { ContactsIndicator } from "../constants/ContactsIndicator.constants";
import { NewChatOverlayItemConstants } from "../constants/NewChatOverlayItemConstants.constants";
import { SearchTextfieldPlaceholders } from "../constants/SearchTextfieldPlaceholders.constants";
import { useAppDispatch } from "../redux/hooks";
import {
  setShowChatroomOverlay,
  setShowCreateChatroomOverlay,
  setShowSidebarNewChatOverlay,
} from "../redux/reducers/chatroom.reducer";
import { useCheckIfChatroomExistMutation } from "../services/chatroom.api";
import { useGetContactByUserIdQuery } from "../services/contact.api";
import { TokenDataType } from "../types/rtkQuery/authenticationApi.type";
import {
  formattedContact,
  getContactByUserIdResponseType,
} from "../types/rtkQuery/contactApi.type";
import { ContactSeparatorDiv } from "./ContactsSeparatorDiv";
import { SearchTextfield } from "./SearchTextfield";
import { SidebarNewChatComponent } from "./SidebarNewChatComponent";
import { SidebarOverlayHeader } from "./SidebarOverlayHeader";
import { formattedChatroomMessageType } from "../types/chatRoomType";

export const SidebarNewChat = ({
  selectedContact,
  setSelectedContact,
  setSelectedChatroomId,
  setMessageToDisplay,
}: {
  selectedContact: getContactByUserIdResponseType;
  setSelectedContact: Dispatch<SetStateAction<getContactByUserIdResponseType>>;
  setSelectedChatroomId: Dispatch<SetStateAction<string>>;
  setMessageToDisplay: Dispatch<SetStateAction<formattedChatroomMessageType[]>>;
}) => {
  //constants
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode<TokenDataType>(String(token));

  // rtk query
  const {
    data: contactData,
    error: contactError,
    isLoading: isContactApiLoading,
  } = useGetContactByUserIdQuery(undefined);

  const [
    checkExistingChatroomTrigger,
    {
      data: checkExistingChatroomData,
      isLoading: isCheckExistingChatroomLoading,
    },
  ] = useCheckIfChatroomExistMutation();

  // functions
  const handleBackButtonClicked = () => {
    dispatch(setShowSidebarNewChatOverlay(false));
  };

  const handleContactsOnClick = async (
    contactName: string,
    phoneNum: number
  ) => {
    setSelectedContact({
      contact_name: contactName,
      contact_phone_num: phoneNum,
    });

    try {
      const response = await checkExistingChatroomTrigger([
        decodedToken.phone_number,
        phoneNum,
      ]);

      if (response.data) {
        setSelectedChatroomId(response.data?.id);
        dispatch(setShowChatroomOverlay(true));
      } else {
        setSelectedChatroomId("");
        dispatch(setShowCreateChatroomOverlay(true));
        dispatch(setShowChatroomOverlay(false));
        setMessageToDisplay([]);
      }
    } catch (err) {
      console.error(err);
    }

    dispatch(setShowSidebarNewChatOverlay(false));
  };
  return (
    <div className="flex flex-CND_ max-w-30% flex-col  h-full">
      <SidebarOverlayHeader handleBackButtonClicked={handleBackButtonClicked} />
      <SearchTextfield placeholder={SearchTextfieldPlaceholders.nameOrNumber} />

      <div className="flex-1 w-full overflow-y-scroll overflow-x-hidden">
        {NewChatOverlayItemConstants.map((data) => (
          <SidebarNewChatComponent
            key={data.id}
            id={data.id}
            newChatOverlayItemIcon={data.newChatOverlayItemIcon}
            newChatOverlayItemLabel={data.newChatOverlayItemLabel}
            isContact={false}
          />
        ))}

        <div className="h-cellHeight w-[493px] bg-white uppercase pt-[30px] pr-0 pb-chatSpacing pl-[32px] text-panelBackgroundColor">
          {ContactsIndicator.contactsOnWhatsapp}
        </div>

        {isContactApiLoading
          ? "LOADING..."
          : contactData.map((data: formattedContact) => (
              <Fragment key={data.key}>
                <ContactSeparatorDiv key={data.key} label={data.key} />
                {data.contact.map(
                  (contactDetails: getContactByUserIdResponseType) => (
                    <SidebarNewChatComponent
                      key={contactDetails.contact_phone_num}
                      id={String(contactDetails.contact_phone_num)}
                      newChatOverlayItemIcon={mockImage2}
                      newChatOverlayItemLabel={contactDetails.contact_name}
                      isContact={true}
                      handleContactsOnClick={handleContactsOnClick}
                      isClicked={
                        selectedContact.contact_phone_num ===
                        contactDetails.contact_phone_num
                      }
                      selectedContact={contactDetails}
                    />
                  )
                )}
              </Fragment>
            ))}
      </div>
    </div>
  );
};
