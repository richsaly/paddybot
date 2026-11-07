import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-800 shadow-lg fixed top-0 left-0 w-full z-50">
      {/* Navbar Container */}
      <div className="flex items-center justify-between py-4 px-6 md:px-20">
        {/* Logo */}
        <Link to="/" className="text-white font-bold text-2xl md:text-3xl">
          PADDY
          <span className="text-red-500 text-4xl">/</span>
          BOT
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => {
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-white text-lg hover:text-red-500 transition duration-300"
          >
            How it works
          </button>

          <Link
            to="/signup"
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-blue-800 hover:scale-105 transition-all duration-300"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-4xl transition-all duration-300 hover:scale-110"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-6 bg-slate-900">
          <button
            onClick={() => {
              setMenuOpen(false);

              setTimeout(() => {
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" });
              }, 300);
            }}
            className="text-white text-lg hover:text-red-500 transition duration-300"
          >
            How it works
          </button>

          <Link
            to="/signup"
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-all duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
