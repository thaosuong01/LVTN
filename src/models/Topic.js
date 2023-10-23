import mongoose from "mongoose";

const { Schema } = mongoose;

const topicSchema = new Schema(
  {
    topic_name: {
      type: String,
      required: true,
    },
    topic_type: {
      type: String,
      required: true,
      enum: ["DOCUMENT", "PRACTICE"],
    },
    class_id: {
      type: Schema.Types.ObjectId,
      ref: "classes",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("topics", topicSchema);
