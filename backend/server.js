import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ FIXED CORS (important)
app.use(cors());
app.options("*", cors());

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// ✅ Products API
app.get("/api/products", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Smartphone",
      price: 20000,
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      name: "Laptop",
      price: 50000,
      image: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      name: "Headphones",
      price: 2000,
      image: "https://via.placeholder.com/150"
    }
  ]);
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));