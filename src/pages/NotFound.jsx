import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";

function NotFound() {
  return (
    <section className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <FaExclamationCircle className="text-red-500 text-7xl animate-bounce" />
        </div>

        {/* 404 */}
        <h1 className="text-7xl font-bold text-slate-800 mb-4">
          404
        </h1>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-slate-700 mb-4">
          Page Not Found
        </h2>

        {/* Message */}
        <p className="text-gray-600 leading-7 mb-8">
          Oops! The page you're looking for doesn't exist,
          has been moved, or the URL may be incorrect.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">

          <Link
            to="/"
            className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 hover:scale-105 transition-all duration-300"
          >
            Back Home
          </Link>

          <Link
            to="/contact"
            className="bg-slate-200 text-slate-800 px-6 py-3 rounded-xl font-semibold hover:bg-slate-300 hover:scale-105 transition-all duration-300"
          >
            Contact Support
          </Link>

        </div>

      </div>
    </section>
  );
}

export default NotFound;