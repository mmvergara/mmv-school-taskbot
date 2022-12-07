import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    taskInfo: { type: String, required: true },
    taskDescription: { type: String, required: true },
    taskCustomId: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("tasks", messageSchema);
