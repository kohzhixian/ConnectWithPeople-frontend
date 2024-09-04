export interface ChatroomInterface {
  id: string;
  chatroom_name: string;
  chatroom_icon: string;
  updated_at: string;
}

export interface ChatroomInitialStateInterface {
  chatrooms: ChatroomInterface[];
}
