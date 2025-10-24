import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  language: { type: String, required: true },
  image: { type: String, required: true } // base64 or URL
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
