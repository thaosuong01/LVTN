import mongoose from "mongoose";
const { Schema } = mongoose;

const fileSchema = new Schema(
  {
    document_id: {
      type: Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    file_name: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("files", fileSchema);
