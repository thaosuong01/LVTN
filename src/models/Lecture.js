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
    video_link: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("lectures", documentSchema);
