import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  native: { type: String, required: true },
  img: { type: String, required: true },
});

export default mongoose.model("Language", languageSchema);
