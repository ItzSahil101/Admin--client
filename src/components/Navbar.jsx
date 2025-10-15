import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Heroicons v2

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.reload(); // refresh page
  };

  return (
    <nav className="bg-blue-500 shadow-lg border-b border-blue-400 fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1
          className="text-2xl font-semibold text-white select-none"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontVariantCaps: "small-caps",
            letterSpacing: "0.12em",
            textShadow: "0 2px 6px rgba(0,0,0,0.25)",
          }}
        >
          <Link to="/">NepMart Admin</Link>
        </h1>

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
              ? "top-[72px] opacity-100 visible p-6 sm:p-0 space-y-4 sm:space-y-0"
              : "top-[-500px] opacity-0 sm:opacity-100 sm:visible"
          }`}
        >
          {/* Manage Text */}
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

          {/* Order Track Button */}
          <Link
            to="/order"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-5 rounded-lg shadow transition-transform transform hover:scale-105 hover:shadow-lg text-center w-full sm:w-auto"
          >
            Order Track
          </Link>

           <Link
            to="/updates"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow transition-transform transform hover:scale-105 hover:shadow-lg text-center w-full sm:w-auto"
          >
            Updates
          </Link>

          {/* User Track Button */}
          <Link
            to="/user-track"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-lg shadow transition-transform transform hover:scale-105 hover:shadow-lg text-center w-full sm:w-auto"
          >
            User Track
          </Link>

          {/* Feedback Button */}
          <Link
            to="/feedback"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-5 rounded-lg shadow transition-transform transform hover:scale-105 hover:shadow-lg text-center w-full sm:w-auto"
          >
            Feedback
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg shadow transition-transform transform hover:scale-105 hover:shadow-lg text-center w-full sm:w-auto"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
