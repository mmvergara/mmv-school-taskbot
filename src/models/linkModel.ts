import mongoose from "mongoose";
const Schema = mongoose.Schema;

const linkSchema = new Schema(
  {
    linkName: { type: String, required: true },
    linkUrl: { type: String, required: true },
    linkCustomId: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("link", linkSchema);
