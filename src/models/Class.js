import mongoose from "mongoose";

const { Schema } = mongoose;

const classSchema = new Schema(
  {
    class_code: {
      type: String,
      required: true,
    },
    class_name: {
      type: String,
      required: true,
    },
    class_pass: {
      type: String,
    },
    display: {
      type: Boolean,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    course_id: {
      type: Schema.Types.ObjectId,
      ref: "courses",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("classes", classSchema);
