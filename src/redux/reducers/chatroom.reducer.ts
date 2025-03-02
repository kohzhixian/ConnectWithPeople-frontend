import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatroomInitialStateInterface } from "../../types/reducer/chatroom.type";

const initialState: ChatroomInitialStateInterface = {
  showChatroomOverlay: false,
  showCreateChatroomOverlay: false,
  showSidebarNewChatOverlay: false,
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

    setShowSidebarNewChatOverlay: (state, action: PayloadAction<boolean>) => {
      state.showSidebarNewChatOverlay = action.payload;
    },
  },
});

export const {
  setShowChatroomOverlay,
  setShowCreateChatroomOverlay,
  setShowSidebarNewChatOverlay,
} = chatroomSlice.actions;

export default chatroomSlice.reducer;
