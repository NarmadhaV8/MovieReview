import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    theme: themeReducer,
  },
});
