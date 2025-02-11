import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5001/invoices";

export const fetchInvoices = createAsyncThunk("invoice/fetchInvoices", async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch invoices from API");
  }
  const data = await response.json();
  return data.map((invoice) => ({
    ...invoice,
    invoiceId: invoice.invoiceId || invoice.id || "N/A",
  }));
});

export const addInvoice = createAsyncThunk("invoice/addInvoice", async (invoiceData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(invoiceData),
  });

  if (!response.ok) {
    throw new Error("Failed to add invoice");
  }
  return await response.json();
});

export const updateInvoice = createAsyncThunk(
  "invoice/updateInvoice",
  async ({ invoiceId, updatedData }) => {

    const response = await fetch(`http://localhost:5001/invoices/${invoiceId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update invoice");
    }

    return await response.json();
  }
);


export const deleteInvoice = createAsyncThunk("invoice/deleteInvoice", async (invoiceId, { rejectWithValue }) => {
  if (!invoiceId) {
    console.error("❌ Attempted to delete an invoice with an invalid ID!");
    return rejectWithValue("Invalid ID");
  }

  const response = await fetch(`${API_URL}/${invoiceId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("❌ Error deleting invoice:", errorData);
    return rejectWithValue(errorData);
  }
  return invoiceId;
});

const initialState = {
  list: [],
  status: "idle",
  error: null,
  visibleInvoices: 8,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    loadMoreInvoices: (state) => {
      if (state.visibleInvoices < state.list.length) {
        state.visibleInvoices += 6;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        console.error("❌ Failed to fetch invoices:", action.error.message);
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        const index = state.list.findIndex((invoice) => invoice.invoiceId === action.payload.invoiceId);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.list = state.list.filter((invoice) => invoice.invoiceId !== action.payload);
      });
  },
});

export const { loadMoreInvoices } = invoiceSlice.actions;
export default invoiceSlice.reducer;
