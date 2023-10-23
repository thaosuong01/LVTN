import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    course_code: {
      type: String,
      required: true,
      unique: true,
    },
    course_name: {
      type: String,
      required: true,
    },
    department_id: {
      type: Schema.Types.ObjectId,
      ref: "departments",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("courses", courseSchema);
