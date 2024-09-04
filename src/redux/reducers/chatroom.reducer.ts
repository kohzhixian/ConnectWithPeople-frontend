import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChatroomInitialStateInterface,
  ChatroomInterface,
} from "../../types/reducer/chatroom.type";

const initialState: ChatroomInitialStateInterface = {
  chatrooms: [],
};

export const chatroomSlice = createSlice({
  name: "chatroom",
  initialState,
  reducers: {
    setChatroom: (state, action: PayloadAction<ChatroomInterface[]>) => {
      state.chatrooms = action.payload;
    },
  },
});
