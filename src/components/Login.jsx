import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/solid";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  // 🧠 Check token validity on mount
  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("adminToken"));
    if (tokenData && tokenData.expiry > Date.now()) {
      navigate("/admin/dashboard"); // Already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Simple static login check
    if (formData.email === "admin" && formData.password === "admin") {
      const token = "qwerty1!2@3#38";
      const expiry = Date.now() + 24 * 60 * 60 * 1000; // valid 1 day

      localStorage.setItem("adminToken", JSON.stringify({ token, expiry }));

      alert("✅ Logged in successfully!");
      navigate("/main");
    } else {
      alert("❌ Invalid ID or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-500 p-3 rounded-full">
            <LockClosedIcon className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mt-4">Admin Login</h1>
          <p className="text-gray-400 text-sm mt-1">Access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm mb-2">ID</label>
            <input
              type="text"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              placeholder="Enter Admin ID"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              placeholder="••••••••"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl font-semibold shadow-lg transition"
          >
            Login
          </motion.button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          © {new Date().getFullYear()} Admin Panel. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
