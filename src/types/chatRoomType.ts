export interface ContactSeparatorDivType {
  label: string;
}

export interface ChatroomDataType {
  id: string;
  chatroom_name: string;
  chatroom_icon: string;
  creaated_at: string;
  updated_at: string;
}

export interface formattedMessageInterface {
  chatroom_id: string | undefined;
  message: string | undefined;
}
