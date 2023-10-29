import mongoose from "mongoose";
const { Schema } = mongoose;

const fileSchema = new Schema(
  {
    file_name: {
      type: String,
      required: true,
    },

    path: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("files", fileSchema);
