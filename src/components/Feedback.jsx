import React from "react";
import { motion } from "framer-motion";
import { ChatBubbleLeftRightIcon, UserCircleIcon, PhoneIcon, ClockIcon } from "@heroicons/react/24/solid";
import Navbar from "./Navbar";

const feedbackData = [
  {
    _id: "68eb2555ff1249c09d6771c9",
    userName: "Code Spire",
    number: "9779812398463",
    message: "Is this test working?",
    createdAt: "2025-10-12T03:49:41.619+00:00",
  },
  {
    _id: "68eb2555ff1249c09d6771d2",
    userName: "Dev Master",
    number: "9779807654321",
    message: "Loving this platform! Smooth and fast 🔥",
    createdAt: "2025-10-13T10:12:15.129+00:00",
  },
];

const Feedback = () => {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center px-4 py-24 sm:px-8 pt-32">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl sm:text-5xl font-bold text-white mb-10 text-center tracking-wide"
        style={{
          fontFamily: "'Playfair Display', serif",
          textShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        All Feedback by Users
      </motion.h1>

      {/* Feedback Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {feedbackData.map((feedback, index) => (
          <motion.div
            key={feedback._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.03, y: -5 }}
            className="bg-gradient-to-br from-slate-800 to-blue-900 rounded-2xl p-6 shadow-2xl border border-blue-700/40 hover:border-blue-500 transition-all duration-300 backdrop-blur-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <UserCircleIcon className="h-10 w-10 text-blue-400 drop-shadow-lg" />
              <div>
                <h2 className="text-xl font-semibold text-white">{feedback.userName}</h2>
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <PhoneIcon className="h-4 w-4 text-gray-400" />
                  <span>{feedback.number}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-200 text-base italic mb-4 leading-relaxed">
              “{feedback.message}”
            </p>

            <div className="flex items-center justify-between text-sm text-gray-400 border-t border-blue-800/50 pt-3">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-gray-400" />
                <span>
                  {new Date(feedback.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-400" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer style accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-16 text-gray-500 text-sm text-center"
      >
        <p>Built with ❤️ by NepMart Admin Team</p>
      </motion.div>
    </div>
    </>
  );
};

export default Feedback;
