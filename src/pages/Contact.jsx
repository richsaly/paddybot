import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


function Contact() {
  return (
    <>

    <Navbar />
    
      <section className="bg-slate-100 min-h-screen pt-32 pb-20 px-6 md:px-12">

        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">

            <h1 className="text-4xl md:text-6xl font-bold text-slate-800">
              Contact Us
            </h1>

            <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
              We'd love to hear from you. Reach out for support, inquiries,
              partnerships, or anything PaddyBOT-related.
            </p>

          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-10">

            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">

              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Send us a Message
              </h2>

              <form className="space-y-5">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-red-500"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-red-500"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-red-500"
                />

                <textarea
                  rows="6"
                  placeholder="Your Message"
                  className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-red-500 resize-none"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-red-500 text-white py-4 rounded-xl font-semibold hover:bg-red-600 hover:scale-[1.02] transition-all duration-300"
                >
                  Send Message
                </button>

              </form>

            </div>

            {/* Contact Details */}
            <div className="space-y-6">

              {/* Email */}
              <div className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-1 transition-all duration-300">

                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  📧 Email
                </h3>

                <p className="text-gray-600">
                  hello@paddybot.com
                </p>

              </div>

              {/* WhatsApp */}
              <div className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-1 transition-all duration-300">

                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  💬 For instant response
                </h3>

                <p className="text-gray-600 mb-4">
                  Chat directly with Selina for quick support and assistance.
                </p>

                <a
                  href="https://wa.me/234XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition"
                >
                  Live Chat with Selina
                </a>

              </div>

              {/* Availability */}
              <div className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-1 transition-all duration-300">

                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  ⏰ Availability
                </h3>

                <p className="text-gray-600">
                  Monday – Sunday
                </p>

                <p className="text-gray-600">
                  Available to assist you throughout the week.
                </p>

              </div>

              {/* Quick CTA */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-3xl p-8 text-white shadow-xl">

                <h3 className="text-2xl font-bold mb-3">
                  Ready to Get Started?
                </h3>

                <p className="mb-6 text-red-100">
                  Join PaddyBOT today and enjoy personalized companion calls,
                  reminder calls, and shout-out services.
                </p>

                <Link
                  to="/signup"
                  className="inline-block bg-white text-red-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
                >
                  Create Account
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Contact;
