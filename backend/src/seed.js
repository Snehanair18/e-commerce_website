import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecommerce_demo";

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for seeding");

    await Product.deleteMany({});

    const products = [
      {
        name: "PixelWave Pro Smartphone",
        description: "6.7\" AMOLED, 5G, 256 GB storage, 50 MP triple camera.",
        price: 59999,
        originalPrice: 74999,
        image:
          "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800",
        tag: "Top Deal"
      },
      {
        name: "AeroBook Ultra Laptop",
        description: "14\" QHD, Intel i7, 16 GB RAM, 1 TB SSD, ultralight design.",
        price: 89999,
        originalPrice: 109999,
        image:
          "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
        tag: "Bestseller"
      },
      {
        name: "NovaPods Max Headphones",
        description:
          "Wireless over-ear with ANC and 40-hour battery life, studio-grade sound.",
        price: 12999,
        originalPrice: 15999,
        image:
          "https://images.pexels.com/photos/3394664/pexels-photo-3394664.jpeg?auto=compress&cs=tinysrgb&w=800",
        tag: "Trending"
      },
      {
          name: "UrbanFit Smartwatch X",
          description:
            "AMOLED display, SpO2, GPS, 14-day battery, advanced fitness tracking.",
          price: 7999,
          originalPrice: 9999,
          image:
            "https://images.pexels.com/photos/2773942/pexels-photo-2773942.jpeg?auto=compress&cs=tinysrgb&w=800",
          tag: "New Arrival"
      },
      {
        name: "Aurora Air Purifier",
        description: "HEPA filter, smart sensor, app control, silent operation.",
        price: 10999,
        originalPrice: 13999,
        image:
          "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=800",
        tag: "Home Essential"
      }
    ];

    await Product.insertMany(products);
    console.log("Seeded products successfully");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();

