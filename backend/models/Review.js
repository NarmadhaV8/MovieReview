import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  movieId: { type: String, required: true }, // <-- change from ObjectId to String
  user: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
}, { timestamps: true });


const Review = mongoose.model("Review", reviewSchema);
export default Review;
