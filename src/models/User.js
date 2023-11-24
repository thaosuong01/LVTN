import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullname: {
      type: String,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
    },
    role_id: {
      type: Schema.Types.ObjectId,
      ref: "roles",
    },
    account_id: {
      type: Schema.Types.ObjectId,
      ref: "accounts",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("users", userSchema);
