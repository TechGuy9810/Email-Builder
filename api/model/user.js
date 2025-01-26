import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    templates: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Template" }, // Reference Template documents by their ObjectIds
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
