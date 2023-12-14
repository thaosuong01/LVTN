import mongoose from "mongoose";

const { Schema } = mongoose;

const examResult = new Schema(
  {
    correctPoints: {
      type: Number,
      require: true,
    },
    totalPoints: {
      type: Number,
    },
    numberOfCorrectAnswers: {
      type: Number,
    },
    numberOfIncorrectAnswers: {
      type: Number,
    },
    numberOfQuestions: {
      type: Number,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    exam_set_id: {
      type: Schema.Types.ObjectId,
      ref: "examSets",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("examResults", examResult);
