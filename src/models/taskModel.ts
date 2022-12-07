import mongoose from "mongoose";
const Schema = mongoose.Schema;
const { Types } = Schema;

const messageSchema = new Schema(
  {
    messageAuthor: {
      type: Types.ObjectId,
    },
    messageContent: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
