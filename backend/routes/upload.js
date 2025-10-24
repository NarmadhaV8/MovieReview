import express from "express";
import multer from "multer";
import fs from "fs";
import Movie from "../models/Movie.js";

const router = express.Router();

// Configure multer to store temporary uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ POST: Upload a movie with image
router.post("/movie", upload.single("image"), async (req, res) => {
  try {
    const { title, language } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imgData = fs.readFileSync(req.file.path);
    const base64Img = imgData.toString("base64");

    const movie = new Movie({
      title,
      language,
      image: `data:image/jpeg;base64,${base64Img}`,
    });

    await movie.save();
    fs.unlinkSync(req.file.path); // delete local temp image

    res.json({ message: "Movie uploaded successfully", movie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET: Fetch all movies
router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
