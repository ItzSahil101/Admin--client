// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.reload();
  };

  return (
    <nav className="bg-blue-500 shadow-lg border-b border-blue-400 fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-5 py-4">
        {/* Left Section (Logo + Download Button) */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Logo */}
          <h1
            className="text-xl sm:text-2xl font-semibold text-white select-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontVariantCaps: "small-caps",
              letterSpacing: "0.12em",
              textShadow: "0 2px 6px rgba(0,0,0,0.25)",
            }}
          >
            <Link to="/">NepMart Admin</Link>
          </h1>

          {/* Download App Button */}
          <a
            href="/admin.apk"
            download
            className="flex items-center gap-2 bg-gray-700/70 hover:bg-gray-600/80 text-white font-medium py-2 px-3 sm:px-4 rounded-lg shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            title="Download Admin App"
          >
            <ArrowDownTrayIcon className="h-5 w-5 text-white" />
            <span className="hidden sm:inline">Download App</span>
          </a>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="text-white sm:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className="h-7 w-7 text-white transition-transform duration-200" />
          ) : (
            <Bars3Icon className="h-7 w-7 text-white transition-transform duration-200" />
          )}
        </button>

        {/* Menu Items */}
        <div
          className={`flex flex-col sm:flex-row items-center sm:gap-5 absolute sm:static bg-blue-500 sm:bg-transparent left-0 w-full sm:w-auto transition-all duration-300 ease-in-out ${
            menuOpen
              ? "top-[70px] opacity-100 visible p-6 sm:p-0 space-y-4 sm:space-y-0"
              : "top-[-400px] opacity-0 sm:opacity-100 sm:visible"
          }`}
        >
          {/* Manage Label */}
          <div
            className="text-white font-medium text-lg tracking-wide text-center sm:text-left mb-2 sm:mb-0"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontVariantCaps: "small-caps",
              letterSpacing: "0.1em",
              textShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }}
          >
            Manage
          </div>

          {/* Order Track */}
          <Link
            to="/order"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-5 rounded-lg shadow transition-transform transform hover:scale-105 hover:shadow-lg w-full sm:w-auto text-center"
          >
            Order Track
          </Link>

          {/* Updates */}
          <Link
            to="/updates"
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-5 rounded-lg shadow transition-transform transform hover:scale-105 hover:shadow-lg w-full sm:w-auto text-center"
          >
            Updates
          </Link>

          {/* User Track */}
          <Link
            to="/user-track"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-lg shadow transition-transform transform hover:scale-105 hover:shadow-lg w-full sm:w-auto text-center"
          >
            User Track
          </Link>

          {/* Feedback */}
          <Link
            to="/feedback"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-5 rounded-lg shadow transition-transform transform hover:scale-105 hover:shadow-lg w-full sm:w-auto text-center"
          >
            Feedback
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg shadow transition-transform transform hover:scale-105 hover:shadow-lg w-full sm:w-auto text-center"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
