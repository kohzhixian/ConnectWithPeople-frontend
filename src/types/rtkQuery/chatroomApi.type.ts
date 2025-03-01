export interface CreateChatroomRequestType {
  chatroom_name: string;
  chatroom_icon: string;
  userPhoneNum: number[];
}

export interface CreateChatroomResponseType {
  chatroomId: string;
}

export interface ChatroomDataInterface {
  text: string;
  status: string;
  updated_at: string;
  created_at: string;
  username: string;
  messageId: string;
  userId: string;
  phone_num: number;
}

export interface ChatroomDetailsMappingObj {
  [key: string]: ChatroomDataInterface[];
}

export interface GetUsersInChatroomResponse {
  userId: string;
  name: string;
  phoneNum: number;
  username: string;
}
