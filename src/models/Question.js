import mongoose from "mongoose";

const { Schema } = mongoose;

const question = new Schema(
  {
    question: {
      type: String,
      require: true,
    },
    correctAnswer: {
      type: String,
    },
    questionType: {
      type: String,
    },
    questionCorrect: {
      type: String,
    },
    point: {
      type: String,
    },
    answers: [
      {
        type: String,
      },
    ],
    exam_set_id: {
      type: Schema.Types.ObjectId,
      ref: "examSets",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("questions", question);
