import express from "express";
import Movie from "../models/Movie.js";

const router = express.Router();

// GET all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().lean();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST a single movie
router.post("/bulk", async (req, res) => {
  const { title, language, image } = req.body;

  if (!title || !language || !image)
    return res.status(400).json({ message: "Title, language, and image are required" });

  try {
    const newMovie = new Movie({ title, language, image });
    await newMovie.save();
    res.status(201).json({ message: "Movie added", movie: newMovie });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST multiple movies (bulk insert)
router.post("/bulk", async (req, res) => {
  const { movies } = req.body; // movies = [{title, language, image}, {...}, ...]

  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    return res.status(400).json({ message: "Provide an array of movies" });
  }

  try {
    await Movie.insertMany(movies);
    res.status(201).json({ message: "Movies inserted", count: movies.length });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


export default router;
