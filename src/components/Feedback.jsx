import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  PhoneIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import Navbar from "./Navbar";

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get("https://admin-server-2aht.onrender.com/api/extra/f");
        console.log(res.data);
        setFeedbackData(res.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);

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

        {/* Loading animation */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-48"
          >
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        ) : feedbackData.length === 0 ? (
          <p className="text-gray-400 text-lg mt-10">No feedbacks found 😢</p>
        ) : (
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
                    <h2 className="text-xl font-semibold text-white">
                      {feedback.userName || "Anonymous"}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <PhoneIcon className="h-4 w-4 text-gray-400" />
                      <span>{feedback.number || "N/A"}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-200 text-base italic mb-4 leading-relaxed">
                  “{feedback.message || "No message provided"}”
                </p>

                <div className="flex items-center justify-between text-sm text-gray-400 border-t border-blue-800/50 pt-3">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-gray-400" />
                    <span>
                      {feedback.createdAt
                        ? new Date(feedback.createdAt).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "Unknown time"}
                    </span>
                  </div>
                  <ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-400" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer */}
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
