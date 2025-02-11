import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFilterOpen: false,
  filters: {
    invoiceNumber: "",
    clientName: "",
    clientEmail: "",
    status: "",
    paymentMethod: "",
    category: "",
    tags: [],
  },
  sortBy: "clientName",
  sortDirection: "asc",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleFilter: (state) => {
      state.isFilterOpen = !state.isFilterOpen;
    },

    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload.value };
    },
    clearFilters: (state) => {
      state.filters = {
        invoiceNumber: "",
        clientName: "",
        clientEmail: "",
        status: "",
        paymentMethod: "",
        category: "",
        tags: [],
      };
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    toggleSortDirection: (state) => {
      state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
    },
  },
});

export const { toggleFilter, setFilter, clearFilters, setSortBy, toggleSortDirection } = filterSlice.actions;
export default filterSlice.reducer;
