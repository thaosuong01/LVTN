import mongoose from "mongoose";

const { Schema } = mongoose;

const examSet = new Schema(
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
    set_name: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
    },
    attempt_count: {
      type: Number,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("examSets", examSet);
