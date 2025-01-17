import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isCreating: false,
  },
  reducers: {
    openInvoice: (state) => {
      state.isCreating = true;
    },
    closeInvoice: (state) => {
      state.isCreating = false;
    },
    resetUI: (state) => {
      state.isCreating = false;
    },
  },
});

export const { openInvoice, closeInvoice, resetUI } = uiSlice.actions;
export default uiSlice.reducer;
