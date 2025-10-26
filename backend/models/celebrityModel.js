import mongoose from "mongoose";

const celebritySchema = new mongoose.Schema({
  name: { type: String, required: true },
  profession: { type: String, required: true },
  image: { type: String }, // optional: URL or file upload
  bio: { type: String },
  awards: { type: [String] }, // array of strings
});

const Celebrity = mongoose.model("Celebrity", celebritySchema);
export default Celebrity;
