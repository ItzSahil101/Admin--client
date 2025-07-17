import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: "#3B82F6" }} className="shadow-lg border-b border-blue-400">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <h1
          className="text-2xl font-semibold text-white"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontVariantCaps: "small-caps",
            letterSpacing: "0.12em",
            textShadow: "0 2px 6px rgba(0,0,0,0.25)",
          }}
        >
          <a href="/">NepCart Admin</a>
        </h1>
        <div className="flex gap-4 items-center">
          <div
            className="text-white font-medium text-lg tracking-wide"
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
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded shadow"
          >
            Order Track
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
