import mongoose from "mongoose";
const { Schema } = mongoose;

const exerciseSubmitSchema = new Schema(
  {
    student_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exercise_id: {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
    exercise_score: {
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

  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("exerciseSubmits", exerciseSubmitSchema);
