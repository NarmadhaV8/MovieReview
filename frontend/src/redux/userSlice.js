import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("currentUser")) || null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return action.payload;
    },
    logout: () => {
      localStorage.removeItem("currentUser");
      return null;
    },
    updateProfile: (state, action) => {
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
