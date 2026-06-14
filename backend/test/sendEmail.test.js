import test from "node:test";
import assert from "node:assert/strict";
import { sendEnquiryEmail } from "../src/utils/sendEmail.js";

test("reports missing email configuration clearly", async () => {
  const originalValues = {};
  const names = ["EMAIL_HOST", "EMAIL_PORT", "EMAIL_USER", "EMAIL_PASS", "EMAIL_TO"];

  for (const name of names) {
    originalValues[name] = process.env[name];
    delete process.env[name];
  }

  await assert.rejects(
    sendEnquiryEmail({
      name: "Test Customer",
      email: "customer@example.com",
      phone: "0712345678",
      tourPackage: "Mirissa Tour",
      message: "Test message",
    }),
    /Missing or placeholder email configuration/,
  );

  for (const name of names) {
    if (originalValues[name] === undefined) delete process.env[name];
    else process.env[name] = originalValues[name];
  }
});

test("does not treat placeholder email secrets as configured", async () => {
  const originalValues = {};
  const validConfig = {
    EMAIL_HOST: "smtp.example.com",
    EMAIL_PORT: "587",
    EMAIL_USER: "business@example.com",
    EMAIL_PASS: "your-gmail-app-password",
    EMAIL_TO: "business@example.com",
  };

  for (const [name, value] of Object.entries(validConfig)) {
    originalValues[name] = process.env[name];
    process.env[name] = value;
  }

  await assert.rejects(
    sendEnquiryEmail({
      name: "Test Customer",
      email: "customer@example.com",
      phone: "0712345678",
      tourPackage: "Mirissa Tour",
      message: "Test message",
    }),
    /placeholder email configuration: EMAIL_PASS/,
  );

  for (const name of Object.keys(validConfig)) {
    if (originalValues[name] === undefined) delete process.env[name];
    else process.env[name] = originalValues[name];
  }
});
