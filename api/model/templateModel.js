import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: {
      type: String,
      required: false,
      default: "This is header",
    },
    content: {
      type: String,
      required: false,
      default: "This is Content",
    },
    imageUrl: {
      type: String,
      required: false,
      default:
        "https://res.cloudinary.com/ddunfyfvd/image/upload/v1737894800/agah5wozdav8xknskiws.jpg",
    },
    footer: {
      type: String,
      required: false,
      default: "This is footer",
    },
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);
export default Template;
