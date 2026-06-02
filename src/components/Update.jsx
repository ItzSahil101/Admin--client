import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import Navbar from "./Navbar";

const UpdateMessages = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMsg, setNewMsg] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // ✅ Your live API base
  const API_BASE = "https://admin-server-2aht.onrender.com/api/extra";

  // ✅ Fetch all updates
  const fetchUpdates = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/update`);
      setUpdates(res.data);
    } catch (error) {
      console.error("Error fetching updates:", error);
      setUpdates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  // ✅ Add new update message
  const handleAdd = async () => {
    if (!newMsg.trim()) {
      alert("Please enter a message before adding.");
      return;
    }
    try {
      setIsAdding(true);
      await axios.post(`${API_BASE}/update`, { msg: newMsg });
      setNewMsg("");
      await fetchUpdates();
      alert("✅ Update message added successfully!");
    } catch (error) {
      console.error("Error adding update:", error);
      alert("❌ Failed to add update message.");
    } finally {
      setIsAdding(false);
    }
  };

  // ✅ Delete update message
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.post(`${API_BASE}/update/delete/${id}`);
      setUpdates((prev) => prev.filter((u) => u._id !== id));
      alert("🗑️ Update message deleted successfully!");
    } catch (error) {
      console.error("Error deleting update:", error);
      alert("❌ Failed to delete update message.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col items-center pt-32 px-4 sm:px-8">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-bold mb-10 text-center"
          style={{
            fontFamily: "'Playfair Display', serif",
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          System Update Messages
        </motion.h1>

        {/* Add new update input */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mb-10">
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Enter a new update message..."
            className="flex-1 px-4 py-3 rounded-lg bg-slate-800 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAdd}
            disabled={isAdding}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
              isAdding
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <PlusIcon className="h-5 w-5" />
            {isAdding ? "Adding..." : "Add"}
          </button>
        </div>

        {/* Display updates */}
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : updates.length === 0 ? (
          <p className="text-gray-400 text-lg mt-10">No updates found 😢</p>
        ) : (
          <div className="w-full max-w-3xl space-y-4">
            <AnimatePresence>
              {updates.map((update) => (
                <motion.div
                  key={update._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gradient-to-br from-slate-800 to-blue-900 p-5 rounded-xl border border-blue-700/40 shadow-lg relative flex justify-between items-start"
                >
                  <div>
                    <p className="text-lg font-medium text-white break-words">
                      {update.msg}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      {new Date(update.createdAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(update._id)}
                    className="text-red-400 hover:text-red-600 transition transform hover:scale-110"
                    title="Delete Update"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateMessages;
