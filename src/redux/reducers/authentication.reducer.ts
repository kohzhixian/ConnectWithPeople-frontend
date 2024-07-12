import { createSlice } from "@reduxjs/toolkit";
import { AuthenticationInterface } from "../../types/reducer/authentication.type";

const accessToken = localStorage.getItem("token");
const initialState: AuthenticationInterface = {
  isAuthenticated: accessToken ? true : false,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
