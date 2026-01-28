import app from "./app.js";
import { connectDB } from "./config/database.js";
import { createServer } from "http";
import { initializeSocket } from "./utils/socket.js";

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

initializeSocket(httpServer);

connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log("Server is running on PORT:", PORT);
    });
  })
  .catch((error:any) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });