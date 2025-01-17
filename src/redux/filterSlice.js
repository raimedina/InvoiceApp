import { createSlice } from "@reduxjs/toolkit";
import data from "../data/data.json";

const initialState = {
  isFilterOpen: false,
  filters: {
    invoiceNumber: "",
    clientName: "",
    clientEmail: "",
    status: "",
    paymentMethod: "",
    category: "",
    tags: "",
  },
  sortBy: "clientName",
  sortDirection: "asc",
  fullList: data,
  filteredList: data,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleFilter: (state) => {
      state.isFilterOpen = !state.isFilterOpen;
    },

    setFilter: (state, action) => {
      const { field, value } = action.payload;
      state.filters[field] = value;
      state.filteredList = applyFiltersAndSort(state);
    },

    clearFilters: (state) => {
      state.filters = {
        invoiceNumber: "",
        clientName: "",
        clientEmail: "",
        status: "",
        paymentMethod: "",
        category: "",
        tags: "",
      };
      state.filteredList = applyFiltersAndSort(state);
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.filteredList = applyFiltersAndSort(state);
    },

    toggleSortDirection: (state) => {
      state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
      state.filteredList = applyFiltersAndSort(state);
    },
  },
});

const applyFiltersAndSort = (state) => {
  const { filters, fullList, sortBy, sortDirection } = state;

  let filtered = [...fullList];

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      filtered = filtered.filter((invoice) =>
        invoice[key]?.toString().toLowerCase().includes(value.toLowerCase())
      );
    }
  });

  filtered.sort((a, b) => {
    if (sortBy === "amount" || sortBy === "tax") {
      return sortDirection === "asc" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    } else if (sortBy === "issueDate" || sortBy === "dueDate") {
      return sortDirection === "asc"
        ? new Date(a[sortBy]) - new Date(b[sortBy])
        : new Date(b[sortBy]) - new Date(a[sortBy]);
    } else {
      return sortDirection === "asc"
        ? a[sortBy]?.localeCompare(b[sortBy])
        : b[sortBy]?.localeCompare(a[sortBy]);
    }
  });

  return filtered;
};

export const { toggleFilter, setFilter, clearFilters, setSortBy, toggleSortDirection } = filterSlice.actions;
export default filterSlice.reducer;
