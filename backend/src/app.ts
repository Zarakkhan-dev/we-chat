import express from "express";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import messageRoutes from "./routes/messageRoutes";
import chatRoutes from "./routes/chatRoutes";
import { clerkMiddleware } from '@clerk/express'
import { errorHandler } from "./middleware/errorHandler";
import path from "path";

const app = express();

//middlewares
app.use(express.json());
app.use(clerkMiddleware({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
}));


app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message:"server is running"});
});


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chats", chatRoutes);

// error handling middleware
app.use(errorHandler);

// server frontend in production
if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../web/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"../../web/dist/index.html"))
  })
}
export default app;