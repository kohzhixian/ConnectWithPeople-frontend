export interface CreateChatroomRequestType {
  chatroom_name: string;
  chatroom_icon: string;
  userPhoneNum: number[];
}

export interface CreateChatroomResponseType {
  chatroomId: string;
}
