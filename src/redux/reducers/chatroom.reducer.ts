import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChatroomInitialStateInterface,
  ChatroomInterface,
} from "../../types/reducer/chatroom.type";

const initialState: ChatroomInitialStateInterface = {
  showChatroomOverlay: false,
  showCreateChatroomOverlay: false,
};

export const chatroomSlice = createSlice({
  name: "chatroom",
  initialState,
  reducers: {
    setShowChatroomOverlay: (state, action: PayloadAction<boolean>) => {
      state.showChatroomOverlay = action.payload;
    },

    setShowCreateChatroomOverlay: (state, action: PayloadAction<boolean>) => {
      state.showCreateChatroomOverlay = action.payload;
    },
  },
});

export const { setShowChatroomOverlay, setShowCreateChatroomOverlay } =
  chatroomSlice.actions;

export default chatroomSlice.reducer;
