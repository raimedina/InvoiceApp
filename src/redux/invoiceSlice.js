import { createSlice } from "@reduxjs/toolkit";
import data from "../data/data.json";

const loadFromLocalStorage = () => {
  try {
    const storedData = localStorage.getItem("invoices");
    return storedData ? JSON.parse(storedData) : data;
  } catch (error) {
    console.error("Failed to load invoices from localStorage:", error);
    return data;
  }
};

const saveToLocalStorage = (invoices) => {
  try {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  } catch (error) {
    console.error("Failed to save invoices to localStorage:", error);
  }
};

const initialState = {
  list: loadFromLocalStorage(),
  status: "idle",
  error: null,
  visibleInvoices: 8,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    loadInvoices: (state) => {
      if (state.status === "idle" || state.list.length === 0) {
        state.status = "loading";
        try {
          const invoices = loadFromLocalStorage();
          state.list = Array.isArray(invoices) ? invoices : [];
          saveToLocalStorage(state.list);
          state.status = "succeeded";
        } catch (error) {
          state.status = "failed";
          state.error = error.message;
        }
      }
    },

    loadMoreInvoices: (state) => {
      if (state.visibleInvoices < state.list.length) {
        state.visibleInvoices += 6;
      }
    },

    addInvoice: (state, action) => {
      const {
        invoiceNumber,
        clientName,
        clientEmail,
        amount,
        currency,
        discount,
        tax,
        status,
        issueDate,
        dueDate,
        paymentMethod,
        category,
        tags,
        notes,
      } = action.payload;

      const newInvoice = {
        invoiceId: Date.now().toString(),
        invoiceNumber,
        clientName,
        clientEmail,
        amount: parseFloat(amount),
        currency: currency || "USD",
        discount: parseFloat(discount) || 0,
        tax: parseFloat(tax) || 0,
        status: ["Pending", "Paid", "Overdue"].includes(status) ? status : "Pending",
        issueDate,
        dueDate,
        paymentMethod: paymentMethod || "Cash",
        category: category || "Development",
        tags: Array.isArray(tags) ? tags : tags.split(",").map((tag) => tag.trim()),
        notes,
        paymentDate: status === "Paid" ? new Date().toISOString() : null,
      };

      state.list.push(newInvoice);
      saveToLocalStorage(state.list);
      state.status = "succeeded";
    },

    updateInvoice: (state, action) => {
      const { invoiceId, updatedData } = action.payload;
      const index = state.list.findIndex((invoice) => invoice.invoiceId === invoiceId);

      if (index !== -1) {
        state.list[index] = {
          ...state.list[index],
          ...updatedData,
          amount: parseFloat(updatedData.amount),
          discount: parseFloat(updatedData.discount),
          tax: parseFloat(updatedData.tax),
          tags: Array.isArray(updatedData.tags)
            ? updatedData.tags
            : updatedData.tags.split(",").map((tag) => tag.trim()),
          paymentDate: updatedData.status === "Paid" ? new Date().toISOString() : state.list[index].paymentDate,
        };
        saveToLocalStorage(state.list);
        state.status = "updated";
      }
    },

    deleteInvoice: (state, action) => {
      const invoiceIdToDelete = action.payload;
      state.list = state.list.filter((invoice) => invoice.invoiceId !== invoiceIdToDelete);
      saveToLocalStorage(state.list);
      state.status = "deleted";
    },

    markInvoiceAsPaid: (state, action) => {
      const invoiceId = action.payload;
      const invoice = state.list.find((inv) => inv.invoiceId === invoiceId);

      if (invoice) {
        invoice.status = "Paid";
        invoice.paymentDate = new Date().toISOString();
        saveToLocalStorage(state.list);
        state.status = "updated";
      }
    },
  },
});

export const {
  loadInvoices,
  loadMoreInvoices,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  markInvoiceAsPaid,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
