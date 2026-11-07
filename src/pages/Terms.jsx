import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LiveChat from "../components/LiveChat";

function Terms() {
  return (

    <div>

      <Navbar />
      {/* how it works section */}
      <LiveChat />
      <section
        id="how-it-works"
        className="py-20 px-6 flex-col flex items-center justify-center bg-slate-200"
      >
        <section id="how-it-works" className="bg-slate-100 py-20 px-6 md:px-16">
          {/* Heading */}
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
              How It Works
            </h1>

            <p className="text-gray-600 mt-4 text-lg">
              Simple, fast, and human-centered communication services.
            </p>
          </div>

          {/* Content Card */}
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-14 hover:shadow-2xl transition-all duration-500">
            <p className="text-gray-700 text-lg leading-9">
              PaddyBot is a simple communication platform designed to keep
              people connected, supported, and organized through personalized
              calls and voice services.
            </p>

            {/* Services */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Companion Call */}
              <div className="bg-slate-50 rounded-2xl p-6 hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
                <h2 className="text-2xl font-bold text-red-500 mb-4">
                  📞 Companion Call
                </h2>

                <p className="text-gray-600 leading-7">
                  Book a friendly conversation anytime for casual talks,
                  motivation, late-night chats, or emotional support.
                </p>
              </div>

              {/* Shout-Out Call */}
              <div className="bg-slate-50 rounded-2xl p-6 hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
                <h2 className="text-2xl font-bold text-blue-700 mb-4">
                  🎉 Shout-Out Call
                </h2>

                <p className="text-gray-600 leading-7">
                  Send personalized birthday wishes, celebrations, and special
                  messages through scheduled voice calls, texts, or recorded
                  calls.
                </p>
              </div>

              {/* Reminder Call */}
              <div className="bg-slate-50 rounded-2xl p-6 hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                  ⏰ Reminder Call
                </h2>

                <p className="text-gray-600 leading-7">
                  Stay on track with reminder calls for meetings, appointments,
                  tasks, and daily activities.
                </p>
              </div>
            </div>

            {/* Steps */}
            <div className="mt-14">
              <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
                Getting Started is Easy
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-5 rounded-2xl font-semibold text-slate-700 hover:scale-105 transition duration-300">
                  1. Sign up and create your account
                </div>

                <div className="bg-blue-50 p-5 rounded-2xl font-semibold text-slate-700 hover:scale-105 transition duration-300">
                  2. Choose your preferred service
                </div>

                <div className="bg-green-50 p-5 rounded-2xl font-semibold text-slate-700 hover:scale-105 transition duration-300">
                  3. Select a plan or schedule your call
                </div>

                <div className="bg-yellow-50 p-5 rounded-2xl font-semibold text-slate-700 hover:scale-105 transition duration-300">
                  4. Get served quickly and smoothly
                </div>
              </div>
            </div>

            {/* Footer Text */}
            <p className="text-center text-gray-700 text-lg mt-14 leading-8">
              PaddyBot makes human connection, support, and daily assistance
              easily accessible for everyone.
            </p>

            <div className="text-center text-gray-700 text-lg mt-14 leading-8">
              <p className="text-red-500 font-bold mb-2">DISCLAIMER!</p>

              <p>
                Friendly conversation and reminder services only. This platform
                does not provide health therapy and professional medical
                support.
              </p>
            </div>
          </div>
        </section>
      </section>

      {/* CTA Section */}
      <div className="flex flex-col items-center mt-16">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-700 text-center mb-4">
          Ready to get started?
        </h3>

        <p className="text-gray-600 text-center mb-8 max-w-xl">
          Join PaddyBot today and enjoy companion calls, shout-out calls, and
          reminder services designed just for you.
        </p>

        <Link
          to="/signup"
          className="bg-red-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-red-700 hover:scale-105 hover:-translate-y-1 transition-all duration-300"
        >
          Start Talking
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default Terms;
