import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { connectDatabase, getDatabaseStatus } from "./config/db.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import { getEmailStatus } from "./utils/sendEmail.js";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(currentDirectory, "../.env") });

const app = express();
const port = Number(process.env.PORT) || 3001;
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: frontendOrigin }));
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (request, response) => {
  response.json({
    success: true,
    message: "API is running",
    services: {
      database: getDatabaseStatus(),
      email: getEmailStatus(),
    },
  });
});

app.use("/api/enquiries", enquiryRoutes);

app.use((request, response) => {
  response.status(404).json({ success: false, message: "Route not found" });
});

app.use((error, request, response, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return response.status(400).json({
      success: false,
      message: "Invalid JSON request body",
    });
  }

  console.error("Unhandled server error:", error);
  return response.status(500).json({
    success: false,
    message: "An unexpected server error occurred",
  });
});

export { app };

const isDirectRun =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });

  const database = await connectDatabase();
  if (!database.connected) {
    console.warn(`API started without MongoDB: ${database.message}`);
  }
}
