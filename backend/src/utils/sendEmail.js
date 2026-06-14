import nodemailer from "nodemailer";

const emailVariables = ["EMAIL_HOST", "EMAIL_PORT", "EMAIL_USER", "EMAIL_PASS", "EMAIL_TO"];

function isPlaceholder(value = "") {
  return /your-|YOUR_|<[^>]+>/.test(value);
}

function requireEmailConfig() {
  const missing = emailVariables.filter(
    (name) => !process.env[name] || isPlaceholder(process.env[name]),
  );

  if (missing.length > 0) {
    throw new Error(`Missing or placeholder email configuration: ${missing.join(", ")}`);
  }
}

export function getEmailStatus() {
  return emailVariables.every(
    (name) => Boolean(process.env[name]) && !isPlaceholder(process.env[name]),
  )
    ? "configured"
    : "not configured";
}

export async function sendEnquiryEmail(enquiry) {
  requireEmailConfig();

  const port = Number(process.env.EMAIL_PORT);
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const submittedAt = enquiry.createdAt
    ? new Date(enquiry.createdAt).toLocaleString("en-GB", { timeZone: "Asia/Colombo" })
    : new Date().toLocaleString("en-GB", { timeZone: "Asia/Colombo" });

  const text = [
    "New Customer Enquiry - Ceylon Escape Tours",
    "",
    `Customer name: ${enquiry.name}`,
    `Customer email: ${enquiry.email}`,
    `Phone number: ${enquiry.phone}`,
    `Tour package or subject: ${enquiry.tourPackage || enquiry.subject || "Not provided"}`,
    `Travel date: ${enquiry.travelDate ? new Date(enquiry.travelDate).toLocaleDateString("en-GB") : "Not provided"}`,
    `Number of people: ${enquiry.numberOfPeople ?? "Not provided"}`,
    `Message: ${enquiry.message}`,
    `Submitted date/time: ${submittedAt}`,
  ].join("\n");

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    replyTo: enquiry.email,
    subject: "New Customer Enquiry - Ceylon Escape Tours",
    text,
  });
}
