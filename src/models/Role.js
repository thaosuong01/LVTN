import mongoose from "mongoose";

const { Schema } = mongoose;

const roleSchema = new Schema(
  {
    role_name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("roles", roleSchema);
