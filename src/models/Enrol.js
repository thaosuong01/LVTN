import mongoose from "mongoose";

const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    class_id: {
      type: Schema.Types.ObjectId,
      ref: "classes",
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("enrols", accountSchema);
