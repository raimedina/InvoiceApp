import { createSlice } from "@reduxjs/toolkit";

const loadThemeFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch (error) {
      console.error("Erro ao acessar localStorage:", error);
      return false;
    }
  }
  return false;
};

const initialState = {
  darkMode: loadThemeFromLocalStorage(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      try {
        localStorage.setItem("theme", state.darkMode ? "dark" : "light");
      } catch (error) {
        console.error("Erro ao salvar tema no localStorage:", error);
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
