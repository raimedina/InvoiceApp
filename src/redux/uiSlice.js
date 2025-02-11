import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCreating: false,
  isEditing: false,
  currentInvoiceId: null, 
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openInvoice: (state) => {
      state.isCreating = true;
      state.isEditing = false;
      state.currentInvoiceId = null;
    },
    closeInvoice: (state) => {
      state.isCreating = false;
      state.isEditing = false;
      state.currentInvoiceId = null;
    },
    startEditingInvoice: (state, action) => {
      state.isCreating = false;
      state.isEditing = true;
      state.currentInvoiceId = action.payload;
    },
    resetUI: (state) => {
      state.isCreating = false;
      state.isEditing = false;
      state.currentInvoiceId = null;
    },
  },
});

export const { openInvoice, closeInvoice, startEditingInvoice, resetUI } = uiSlice.actions;
export default uiSlice.reducer;
