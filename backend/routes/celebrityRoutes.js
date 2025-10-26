import express from "express";
import Celebrity from "../models/celebrityModel.js";

const router = express.Router();

// POST: Add a celebrity
router.post("/post", async (req, res) => {
  try {
    const { name, profession, image, bio, awards } = req.body;
    const celebrity = new Celebrity({ name, profession, image, bio, awards });
    await celebrity.save();
    res.status(201).json({ message: "Celebrity added successfully", celebrity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Fetch all celebrities
router.get("/", async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    res.json(celebrities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
