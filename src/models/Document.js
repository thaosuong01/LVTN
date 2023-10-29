import mongoose from "mongoose";
const { Schema } = mongoose;

const documentSchema = new Schema(
  {
    class_id: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    topic_id: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    files: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("documents", documentSchema);
