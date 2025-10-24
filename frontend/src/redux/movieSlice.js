import { createSlice } from "@reduxjs/toolkit";

// Load initial movies and reviews from localStorage
const initialMovies = JSON.parse(localStorage.getItem("movies")) || [];
const initialReviews = JSON.parse(localStorage.getItem("reviews")) || {};

export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    list: initialMovies,
    reviews: initialReviews,
  },
  reducers: {
    setMovies: (state, action) => {
      state.list = action.payload;
      localStorage.setItem("movies", JSON.stringify(state.list));
    },
    addMovie: (state, action) => {
      state.list.push(action.payload);
      localStorage.setItem("movies", JSON.stringify(state.list));
    },
    deleteMovie: (state, action) => {
      state.list = state.list.filter((m) => m.id !== action.payload);
      localStorage.setItem("movies", JSON.stringify(state.list));
    },
    addReview: (state, action) => {
      const { movieId, review } = action.payload;
      if (!state.reviews[movieId]) state.reviews[movieId] = [];
      state.reviews[movieId].push(review);
      localStorage.setItem("reviews", JSON.stringify(state.reviews));
    },
  },
});

export const { setMovies, addMovie, deleteMovie, addReview } = movieSlice.actions;
export default movieSlice.reducer;

// ✅ Add this extra export (no original line removed)
export const selectMoviesList = (state) => state.movies.list;
