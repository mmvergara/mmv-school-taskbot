import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    taskName: { type: String, required: true },
    taskDescription: { type: String, required: true },
    taskDeadline: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("tasks", messageSchema);
