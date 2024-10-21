export interface createMessageRequestType {
  text: string;
  chatroom_id: string;
}

export interface createMessageResponseType {
  message: string;
  messageId: string;
}
