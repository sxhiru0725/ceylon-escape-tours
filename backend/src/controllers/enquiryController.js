import mongoose from "mongoose";
import { Enquiry } from "../models/Enquiry.js";
import { sendEnquiryEmail } from "../utils/sendEmail.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9\s-]{7,15}$/;

export function validateEnquiry(data = {}) {
  const errors = {};
  const enquiry = {
    name: String(data.name ?? "").trim(),
    email: String(data.email ?? "").trim().toLowerCase(),
    phone: String(data.phone ?? "").trim(),
    subject: String(data.subject ?? "").trim(),
    tourPackage: String(data.tourPackage ?? "").trim(),
    message: String(data.message ?? "").trim(),
    travelDate: data.travelDate || undefined,
    numberOfPeople:
      data.numberOfPeople === "" || data.numberOfPeople == null
        ? undefined
        : Number(data.numberOfPeople),
  };

  if (!enquiry.name) errors.name = "Name is required";
  if (!emailPattern.test(enquiry.email)) errors.email = "A valid email is required";
  if (!phonePattern.test(enquiry.phone)) errors.phone = "A valid phone number is required";
  if (!enquiry.subject && !enquiry.tourPackage) {
    errors.tourPackage = "A tour package or subject is required";
  }
  if (!enquiry.message) errors.message = "Message is required";
  if (enquiry.message.length > 2000) errors.message = "Message must be 2000 characters or fewer";

  if (enquiry.travelDate) {
    const date = new Date(enquiry.travelDate);
    if (Number.isNaN(date.getTime())) errors.travelDate = "Travel date is invalid";
  }

  if (
    enquiry.numberOfPeople !== undefined &&
    (!Number.isInteger(enquiry.numberOfPeople) ||
      enquiry.numberOfPeople < 1 ||
      enquiry.numberOfPeople > 100)
  ) {
    errors.numberOfPeople = "Number of people must be between 1 and 100";
  }

  return { errors, enquiry };
}

export async function createEnquiry(request, response) {
  const { errors, enquiry: validEnquiry } = validateEnquiry(request.body);

  if (Object.keys(errors).length > 0) {
    return response.status(400).json({
      success: false,
      message: "Please correct the highlighted fields",
      errors,
    });
  }

  if (mongoose.connection.readyState !== 1) {
    return response.status(503).json({
      success: false,
      message: "Database is unavailable. Please try again later.",
    });
  }

  let savedEnquiry;

  try {
    savedEnquiry = await Enquiry.create(validEnquiry);
  } catch (error) {
    console.error("Failed to save enquiry:", error);
    return response.status(500).json({
      success: false,
      message: "The enquiry could not be saved. Please try again.",
    });
  }

  try {
    await sendEnquiryEmail(savedEnquiry);
  } catch (error) {
    console.error("Enquiry saved, but email notification failed:", error);
    return response.status(502).json({
      success: false,
      message: "Your enquiry was saved, but the email notification could not be sent.",
      enquiryId: savedEnquiry.id,
    });
  }

  return response.status(201).json({
    success: true,
    message: "Thank you. Your enquiry has been sent successfully.",
    enquiryId: savedEnquiry.id,
  });
}
