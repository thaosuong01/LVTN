import mongoose from "mongoose";
const { Schema } = mongoose;

const documentSchema = new Schema(
  {
    class_id: {
      type: Schema.Types.ObjectId,
      ref: "classes",
      required: true,
    },
    topic_id: {
      type: Schema.Types.ObjectId,
      ref: "topic",
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
