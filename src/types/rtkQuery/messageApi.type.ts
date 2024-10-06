export interface createMessageRequestType {
  text: string;
  chatroom_id: string;
}

export interface MessageResponseType {
  message: string;
  messageId: string;
}
