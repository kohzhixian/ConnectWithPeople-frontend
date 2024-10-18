import { Dispatch, SetStateAction } from "react";
import mockImage2 from "../assets/images/mock-test-image2.jpg";
import { ContactsIndicator } from "../constants/ContactsIndicator.constants";
import { NewChatOverlayItemConstants } from "../constants/NewChatOverlayItemConstants.constants";
import { SearchTextfieldPlaceholders } from "../constants/SearchTextfieldPlaceholders.constants";
import { useGetContactByUserIdQuery } from "../services/contact.api";
import {
  formattedContact,
  getContactByUserIdResponseType,
} from "../types/rtkQuery/contactApi.type";
import { ContactSeparatorDiv } from "./ContactsSeparatorDiv";
import { NewChatOverlayItem } from "./NewChatOverlayItem";
import { SearchTextfield } from "./SearchTextfield";
import { SidebarOverlayHeader } from "./SidebarOverlayHeader";

export const NewChatOverlay = ({
  setShowNewChatOverlay,
  setShowCreateChatroomOverlay,
  selectedContact,
  setSelectedContact,
}: {
  setShowNewChatOverlay: (value: React.SetStateAction<boolean>) => void;
  setShowCreateChatroomOverlay: Dispatch<SetStateAction<boolean>>;
  selectedContact: getContactByUserIdResponseType;
  setSelectedContact: Dispatch<SetStateAction<getContactByUserIdResponseType>>;
}) => {
  // use states

  // rtk query
  const {
    data: contactData,
    error: contactError,
    isLoading: isContactApiLoading,
  } = useGetContactByUserIdQuery(undefined);

  // functions
  const handleBackButtonClicked = () => {
    setShowNewChatOverlay(false);
  };

  const handleContactsOnClick = (contactName: string, phoneNum: number) => {
    setSelectedContact({
      contact_name: contactName,
      contact_phone_num: phoneNum,
    });
    setShowCreateChatroomOverlay(true);
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
              <>
                <ContactSeparatorDiv key={data.key} label={data.key} />
                {data.contact.map(
                  (contactDetails: getContactByUserIdResponseType) => (
                    <NewChatOverlayItem
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
              </>
            ))}
      </div>
    </div>
  );
};
