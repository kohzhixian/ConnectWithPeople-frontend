import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MiscInitialStateInterface } from "../../types/reducer/misc.type";

const initialState: MiscInitialStateInterface = {
  showSuccessSnackbar: false,
  successMessage: "",
  showErrorSnackbar: false,
  errorMessage: "",
};

export const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setShowSuccessSnackbar: (state, action: PayloadAction<boolean>) => {
      state.showSuccessSnackbar = action.payload;
    },

    setSuccessMessage: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
    },

    setShowErrorSnackbar: (state, action: PayloadAction<boolean>) => {
      state.showErrorSnackbar = action.payload;
    },

    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setShowSuccessSnackbar,
  setSuccessMessage,
  setShowErrorSnackbar,
  setErrorMessage,
} = miscSlice.actions;

export default miscSlice.reducer;
