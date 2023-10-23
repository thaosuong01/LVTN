import mongoose from "mongoose";

const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      max: 32,
      min: 8,
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("accounts", accountSchema);
