import mongoose from "mongoose";
const { Schema } = mongoose;

const exerciseSubmitSchema = new Schema(
  {
    student_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    exercise_id: {
      type: Schema.Types.ObjectId,
      ref: "exercises",
      required: true,
    },
    grade: {
      type: Number,
    },
    comment: {
      type: String,
    },
    files: [
      {
        type: String,
      },
    ],
    time_submit:{
      type: Date
    }

  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("exerciseSubmits", exerciseSubmitSchema);
