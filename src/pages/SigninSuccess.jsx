import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function SigninSuccess() {
  return (
    <section className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-green-500 text-7xl animate-pulse" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Welcome Back 👋
        </h1>

        {/* Message */}
        <p className="text-gray-600 leading-7 mb-8">
          You have successfully signed in to your PaddyBOT account.
          <br />
          Your personalized calls, reminders, and bookings are ready.
        </p>

        {/* CTA Button */}
        <Link
          to="/dashboard"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300"
        >
          Continue to Dashboard
        </Link>

        {/* Back Home */}
        <div className="mt-6">
          <Link
            to="/"
            className="text-slate-600 hover:text-red-500 transition"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </section>
  );
}

export default SigninSuccess;