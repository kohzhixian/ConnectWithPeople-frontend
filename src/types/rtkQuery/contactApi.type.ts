export interface AddContactReqBodyType {
  phone_num: number;
}

export interface AddContactDtoType {
  addContactReqBody: AddContactReqBodyType;
  userId: string;
}

export type getContactByUserIdResponseType = {
  contact_name: string;
  contact_phone_num: number;
};

export interface formattedContact {
  key: string;
  contact: getContactByUserIdResponseType[];
}

export interface AddContactResponseType {
  message: string;
}
