import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaEye, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = ({ setIsLogin }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/user/register", form);
      if (res.status === 201) {
        toast.success("Registration successful! Please log in.");
        setForm({ name: "", email: "", password: "" });
        setTimeout(() => setIsLogin(true), 1500);
      } else {
        toast.error(res.data.message || "Registration failed.");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center">Create Your Account</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <FaUser className="text-gray-500" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="flex-1 outline-none"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <FaEnvelope className="text-gray-500" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="flex-1 outline-none"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <FaLock className="text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="flex-1 outline-none"
              required
            />
            <FaEye
              className="text-gray-400 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
              title={showPassword ? "Hide Password" : "Show Password"}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading || !form.name || !form.email || !form.password}
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <span
          onClick={() => setIsLogin(true)}
          className="text-blue-500 cursor-pointer"
        >
          Sign In
        </span>
      </p>

      <div className="flex items-center justify-between gap-2 text-sm">
        <div className="w-full border-t" />
        <span className="text-gray-500">Or With</span>
        <div className="w-full border-t" />
      </div>

      <div className="flex gap-4">
        <button className="flex-1 flex items-center justify-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100">
          <FcGoogle className="text-lg" />
          Google
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100">
          <FaApple className="text-lg" />
          Apple
        </button>
      </div>
    </div>
  );
};

export default Signup;