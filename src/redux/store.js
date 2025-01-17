import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import menuReducer from './menuSlice';
import invoiceReducer from './invoiceSlice';
import filterReducer from "./filterSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    theme: themeReducer,
    menu: menuReducer,
    invoice: invoiceReducer,
    ui: uiReducer,


  },
});
