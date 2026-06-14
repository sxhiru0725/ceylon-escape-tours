import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    subject: { type: String, trim: true, maxlength: 150 },
    tourPackage: { type: String, trim: true, maxlength: 150 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    travelDate: { type: Date },
    numberOfPeople: { type: Number, min: 1, max: 100 },
    status: { type: String, default: "new" },
  },
  { timestamps: true },
);

export const Enquiry =
  mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);
