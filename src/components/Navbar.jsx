import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.reload(); // refresh page
  };

  return (
    <nav
      style={{ backgroundColor: "#3B82F6" }}
      className="shadow-lg border-b border-blue-400"
    >
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-6 py-4 gap-3 sm:gap-0">
        {/* Logo */}
        <h1
          className="text-2xl font-semibold text-white"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontVariantCaps: "small-caps",
            letterSpacing: "0.12em",
            textShadow: "0 2px 6px rgba(0,0,0,0.25)",
          }}
        >
          <a href="/">NepMart Admin</a>
        </h1>

        {/* Menu & Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full sm:w-auto">
          <div
            className="text-white font-medium text-lg tracking-wide text-center sm:text-left"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontVariantCaps: "small-caps",
              letterSpacing: "0.1em",
              textShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }}
          >
            Manage Products
          </div>

          <Link
            to="/order"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded shadow transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            Order Track
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
