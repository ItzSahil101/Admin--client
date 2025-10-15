import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrashIcon,
  ClockIcon,
  BellAlertIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Navbar from "./Navbar";

const demoUpdates = [
  {
    _id: "1",
    message: "New category 'Electronics' added to product section!",
    createdAt: "2025-10-10T12:30:00.000+00:00",
  },
  {
    _id: "2",
    message: "We’ve improved the checkout experience for faster payments.",
    createdAt: "2025-10-12T09:15:00.000+00:00",
  },
  {
    _id: "3",
    message: "Bug fix: Profile pictures now load correctly for all users.",
    createdAt: "2025-10-14T18:45:00.000+00:00",
  },
];

const Update = () => {
  const [updates, setUpdates] = useState(demoUpdates);
  const [showModal, setShowModal] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  // Handle delete
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this update?"
    );
    if (!confirmDelete) return;
    setUpdates((prev) => prev.filter((update) => update._id !== id));
  };

  // Handle add new update
  const handleAddUpdate = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return alert("Please write something first!");
    const newUpdate = {
      _id: Date.now().toString(),
      message: newMessage,
      createdAt: new Date().toISOString(),
    };
    setUpdates((prev) => [newUpdate, ...prev]);
    setNewMessage("");
    setShowModal(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center px-4 py-24 sm:px-8 pt-32">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-between items-center w-full max-w-6xl mb-10"
        >
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-6 sm:mb-0 text-center sm:text-left"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            Latest Updates
          </h1>

          {/* Add Update Button */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-600/40 transform hover:scale-105"
          >
            <PlusIcon className="h-5 w-5" />
            Add Update
          </button>
        </motion.div>

        {/* Updates List */}
        {updates.length === 0 ? (
          <p className="text-gray-400 text-lg mt-10">No updates found 😢</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            <AnimatePresence>
              {updates.map((update, index) => (
                <motion.div
                  key={update._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="relative bg-gradient-to-br from-slate-800 to-blue-900 rounded-2xl p-6 shadow-2xl border border-blue-700/40 hover:border-blue-500 transition-all duration-300 backdrop-blur-lg"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(update._id)}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-transform transform hover:scale-110"
                    title="Delete Update"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>

                  {/* Update Icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <BellAlertIcon className="h-10 w-10 text-blue-400 drop-shadow-lg" />
                    <h2 className="text-lg font-semibold text-white tracking-wide">
                      System Update
                    </h2>
                  </div>

                  {/* Message */}
                  <p className="text-gray-200 text-base italic mb-4 leading-relaxed">
                    “{update.message}”
                  </p>

                  {/* Date */}
                  <div className="flex items-center justify-between text-sm text-gray-400 border-t border-blue-800/50 pt-3">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-gray-400" />
                      <span>
                        {new Date(update.createdAt).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 text-gray-500 text-sm text-center"
        >
          <p>Stay tuned for more updates 🚀</p>
        </motion.div>
      </div>

      {/* Modal for Adding Update */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-slate-800 to-blue-900 p-8 rounded-2xl shadow-2xl w-11/12 sm:w-[450px] border border-blue-700/50 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>

              <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                Add New Update
              </h2>

              <form onSubmit={handleAddUpdate}>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Write your update message here..."
                  className="w-full h-32 p-4 bg-slate-900/70 text-white border border-blue-700/50 rounded-xl outline-none resize-none focus:border-blue-500 transition-all placeholder-gray-400"
                />

                <button
                  type="submit"
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-600/40"
                >
                  Post Update
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Update;
