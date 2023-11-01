import mongoose from "mongoose";
const { Schema } = mongoose;

const exerciseSchema = new Schema(
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
    start_time: {
      type: Date,
      require: true,
    },
    deadline: {
      type: Date,
      require: true,
    },
    display: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("exercises", exerciseSchema);
