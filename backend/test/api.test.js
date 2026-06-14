import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { app } from "../src/server.js";

let server;
let baseUrl;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, "127.0.0.1", resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test("rejects an invalid enquiry request", async () => {
  const response = await fetch(`${baseUrl}/api/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.equal(body.success, false);
  assert.equal(body.errors.name, "Name is required");
});

test("returns a clear error when the database is unavailable", async () => {
  const response = await fetch(`${baseUrl}/api/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test Customer",
      email: "customer@example.com",
      phone: "0712345678",
      tourPackage: "Mirissa Tour",
      message: "I want more details about this tour.",
    }),
  });
  const body = await response.json();

  assert.equal(response.status, 503);
  assert.equal(body.message, "Database is unavailable. Please try again later.");
});

test("rejects malformed JSON", async () => {
  const response = await fetch(`${baseUrl}/api/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{",
  });
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.equal(body.message, "Invalid JSON request body");
});

test("health endpoint reports dependency readiness", async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.success, true);
  assert.equal(body.services.database, "disconnected");
  assert.match(body.services.email, /configured/);
});
