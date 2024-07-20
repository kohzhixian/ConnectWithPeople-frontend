export interface ContactRequestBodyType {
  phone_num: string;
}

export type getContactByUserIdResponseType = {
  contact_name: string;
  contact_phone_num: number;
};

export interface formattedContact {
  key: string;
  contact: getContactByUserIdResponseType[];
}
