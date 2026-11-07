import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

function AuthError() {
  const location = useLocation();

  const message =
    location.state?.message ||
    "Something went wrong.crosscheck your details and try again.";

  return (
    <section className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <FaExclamationTriangle className="text-red-500 text-7xl animate-pulse" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Oops!
        </h1>

        {/* Message */}
        <p className="text-gray-600 leading-7 mb-8">
          {message}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">

          <Link
            to="/signin"
            className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-all"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="bg-slate-200 text-slate-800 px-6 py-3 rounded-xl font-semibold hover:bg-slate-300 transition-all"
          >
            Go Home
          </Link>

        </div>

      </div>
    </section>
  );
}

export default AuthError;
