import mongoose from "mongoose";

const { Schema } = mongoose;

const departmentSchema = new Schema(
  {
    department_name: {
      type: String,
      required: true,
      unique: true,
    },
    delete: {
      type: Boolean,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("departments", departmentSchema);
