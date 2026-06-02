import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCircleIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ShoppingCartIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Navbar from "./Navbar";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: null });
  const [confirmText, setConfirmText] = useState("");

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://admin-server-2aht.onrender.com/api/extra/users"
        );
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://admin-server-2aht.onrender.com/api/extra/users/${id}`
      );
      setUsers((prev) => prev.filter((user) => user._id !== id));
      setDeleteModal({ isOpen: false, userId: null });
      setConfirmText("");
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center px-4 py-24 sm:px-8 pt-32">
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
          All Registered Users
        </motion.h1>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-48"
          >
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        ) : users.length === 0 ? (
          <p className="text-gray-400 text-lg mt-10">No users found 😢</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            <AnimatePresence>
              {users.map((user, index) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="relative bg-gradient-to-br from-slate-800 to-blue-900 rounded-2xl p-6 shadow-2xl border border-blue-700/40 hover:border-blue-500 transition-all duration-300 backdrop-blur-lg"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() =>
                      setDeleteModal({ isOpen: true, userId: user._id })
                    }
                    className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-transform transform hover:scale-110"
                    title="Delete User"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>

                  {/* User Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <UserCircleIcon className="h-10 w-10 text-blue-400 drop-shadow-lg" />
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {user.userName}
                      </h2>
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <PhoneIcon className="h-4 w-4 text-gray-400" />
                        <span>{user.number}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-gray-200 text-base italic mb-4 leading-relaxed">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4 text-gray-400" />
                      <span>Location: {user.location}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <ShoppingCartIcon
                        className={`h-5 w-5 ${
                          user.cart && user.cart.length > 0
                            ? "text-green-400"
                            : "text-gray-500"
                        }`}
                      />
                      <span>
                        {user.cart && user.cart.length > 0
                          ? `Has ${user.cart.length} item(s) in cart`
                          : "Cart is empty"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 border-t border-blue-800/50 pt-3">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-gray-400" />
                      <span>
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleString("en-US", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })
                          : "Unknown time"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Delete Modal */}
        <AnimatePresence>
          {deleteModal.isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-slate-900 p-6 rounded-xl w-full max-w-md text-white shadow-xl relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => {
                    setDeleteModal({ isOpen: false, userId: null });
                    setConfirmText("");
                  }}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>

                <h2 className="text-2xl font-bold mb-4">Delete User</h2>
                <p className="mb-2 text-gray-300">
                  Type <span className="font-bold">DELETE</span> to confirm.
                </p>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="Type DELETE here"
                  className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    if (confirmText.toLowerCase() === "delete") {
                      handleDelete(deleteModal.userId);
                    } else {
                      alert("Text does not match! Type DELETE to confirm.");
                    }
                  }}
                  disabled={confirmText.toLowerCase() !== "delete"}
                  className={`w-full py-2 rounded-md font-semibold ${
                    confirmText.toLowerCase() === "delete"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-red-400 cursor-not-allowed"
                  } transition-colors`}
                >
                  Delete
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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

export default Users;
