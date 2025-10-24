// routes/review.js
import express from "express";
import Review from "../models/Review.js"; // create a Review model
const router = express.Router();

// POST a review
router.post("/", async (req, res) => {
  try {
    const { movieId, user, text, rating } = req.body;
    if (!movieId || !user || !text || !rating) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newReview = await Review.create({ movieId, user, text, rating });
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET reviews by movieId (optional)
router.get("/:movieId", async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
