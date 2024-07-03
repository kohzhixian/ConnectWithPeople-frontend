import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthenticationInterface } from "../../types/reducer/authentication.type";

const initialState: AuthenticationInterface = {
  username: "",
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = authenticationSlice.actions;

export default authenticationSlice.reducer;
