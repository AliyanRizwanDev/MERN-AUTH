import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./Routes/UserRoutes.js";
import cors from 'cors'

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors())

// User routes
app.use("/user", UserRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
