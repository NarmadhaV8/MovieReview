import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import moviesRoute from "./routes/movies.js";
import uploadRoute from "./routes/upload.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // for serving uploaded files

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/movies", moviesRoute); // plural form matches route file
app.use("/api/upload", uploadRoute);
app.use("/api/reviews", reviewRoutes);


// ✅ Default test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
