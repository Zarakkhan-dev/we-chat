import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import { errorHandler } from "./middleware/errorHandler.js";
import path from "path";
import { fileURLToPath } from "url";

/* ESM-safe __dirname */
const __filename = fileURLToPath("../../web/dist");
const __dirname = path.dirname(__filename);

const app = express();

//middlewares
app.use(express.json());
app.use(
  clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  }),
);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "server is running" });
});


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chats", chatRoutes);

// error handling middleware
app.use(errorHandler);

// server frontend in production

if (process.env.NODE_ENV === "production") {
  // Use your original relative path
  app.use(express.static(path.join(__dirname, "../../web/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../web/dist/index.html"));
  });
}

export default app;