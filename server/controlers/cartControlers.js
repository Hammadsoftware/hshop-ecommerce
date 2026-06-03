import express from "express";
import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

export const AddToCart = async (req, res) => {
  const { userId, products } = req.body;

  if (!userId || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Invalid payload" });
  }

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the cart exists
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    // Process each product
    for (const productData of products) {
      const {
        productId,
        size,
        color,
        quantity = 1,
        price,
        image,
      } = productData;

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${productId}` });
      }

      const existingIndex = cart.products.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
      );

      if (existingIndex > -1) {
        cart.products[existingIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          size,
          color,
          quantity,
          price,
          image,
        });
      }
    }

    // Recalculate total price
    cart.totalPrice = cart.products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getCart = async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate("userId", "name email")
      .populate("products.productId", "title price image"); // <-- Correct path

    if (!carts || carts.length === 0) {
      return res.status(404).json({ message: "No carts found" });
    }

    res.status(200).json({ carts });
  } catch (error) {
    console.error("Failed to fetch carts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
