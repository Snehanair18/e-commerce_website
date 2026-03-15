import express from "express";
import Product from "../models/product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.json({ products });
  } catch (err) {
    console.error("Products error:", err);
    return res.status(500).json({ message: "Failed to load products" });
  }
});

export default router;

