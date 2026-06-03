import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Controller
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    if (user) {
      const { password, ...userData } = user.toObject();
      return res.status(201).json({ message: "User created successfully", user: userData });
    } else {
      return res.status(400).json({ message: "User not created" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Please fill all fields" });

  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "yoursecret",
      { expiresIn: "7d" }
    );

    // Set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send user info (without password)
    const { password: pwd, ...userData } = user.toObject();
    res.status(200).json({
      message: "Login successful",
      user: userData,
      token, // optional, for client-side storage if needed
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUserAddress = async (req, res) => {
  try {
    const userId = req.user.id; // must be set by auth middleware

    const user = await userModel.findById(userId).select("address");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Address fetched successfully",
      address: user || {},
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const saveUserAddress = async (req, res) => {
  try {
     // Must be provided by auth middleware

    const {
     userId,
      firstName,
      lastName,
      companyName,
      country,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      phone,
    } = req.body;

    const user = await userModel.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.address = {
      firstName,
      lastName,
      companyName,
      country,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      phone,
    };

    await user.save();

    res.status(200).json({ message: "Address saved successfully", address: user.address });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password"); // Exclude password field
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await userModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}
