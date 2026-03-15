import express from "express";
import Cart from "../models/cart.js";
import Product from "../models/product.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get current user's cart
router.get("/", authRequired, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    if (!cart) {
      return res.json({ items: [] });
    }
    return res.json({
      items: cart.items.map((item) => ({
        product: item.product,
        quantity: item.quantity
      }))
    });
  } catch (err) {
    console.error("Get cart error:", err);
    return res.status(500).json({ message: "Failed to load cart" });
  }
});

// Add product to cart
router.post("/add", authRequired, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: []
      });
    }

    const existingIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingIndex >= 0) {
      cart.items[existingIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    const populated = await cart.populate("items.product");

    return res.status(200).json({
      message: "Product added to cart",
      items: populated.items.map((item) => ({
        product: item.product,
        quantity: item.quantity
      }))
    });
  } catch (err) {
    console.error("Add to cart error:", err);
    return res.status(500).json({ message: "Failed to add to cart" });
  }
});

// Remove product from cart
router.post("/remove", authRequired, async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();

    const populated = await cart.populate("items.product");

    return res.status(200).json({
      message: "Product removed from cart",
      items: populated.items.map((item) => ({
        product: item.product,
        quantity: item.quantity
      }))
    });
  } catch (err) {
    console.error("Remove from cart error:", err);
    return res.status(500).json({ message: "Failed to remove from cart" });
  }
});

export default router;

