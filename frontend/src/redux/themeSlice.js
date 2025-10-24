import { createSlice } from "@reduxjs/toolkit";

const initialTheme = localStorage.getItem("theme") === "dark";

export const themeSlice = createSlice({
  name: "theme",
  initialState: { darkMode: initialTheme },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("theme", state.darkMode ? "dark" : "light");
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
