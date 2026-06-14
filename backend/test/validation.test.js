import test from "node:test";
import assert from "node:assert/strict";
import { validateEnquiry } from "../src/controllers/enquiryController.js";

test("accepts a valid enquiry", () => {
  const { errors, enquiry } = validateEnquiry({
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+94 77 123 4567",
    tourPackage: "Ella Mountain Getaway",
    travelDate: "2026-12-01",
    numberOfPeople: "2",
    message: "Window seats, please.",
  });

  assert.deepEqual(errors, {});
  assert.equal(enquiry.numberOfPeople, 2);
});

test("rejects invalid enquiry fields", () => {
  const { errors } = validateEnquiry({});
  assert.deepEqual(Object.keys(errors).sort(), [
    "email",
    "message",
    "name",
    "phone",
    "tourPackage",
  ]);
});
