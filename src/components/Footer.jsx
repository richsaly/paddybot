import React from "react";
import { Link } from "react-router-dom";
import Terms from "../pages/Terms";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-0">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              PADDY
              <span className="text-red-500">/</span>
              BOT
            </h2>

            <p className="text-gray-400 leading-7">
              Helping people stay connected, celebrated, and organized through
              personalized companion calls, shout-out calls, and reminder calls.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-red-500">
              Services
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Companion Calls</li>
              <li>Shout-Out Calls</li>
              <li>Reminder Calls</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-red-500">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <a href="#how-it-works" className="hover:text-white">
                  How It Works
                </a>
              </li>

              <li>
                <a href="#faq" className="hover:text-white">
                  FAQ
                </a>
              </li>

              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-red-500">
              Support
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a  href="https://wa.me/2348142861009" className="hover:text-white">
                  Live Chat with Selina
                </a>
              </li>

              <li>
                <Link to="/terms" className="hover:text-white">
                Terms of Service
                </Link>
              </li>

              <li>
                <Link to="/Privacy" className="hover:text-white">
                Privacy Policy
                </Link>
              </li>
            </ul>

          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-red-500">
              Contact
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>hello@paddybot.com</li>
              <li>+234 XXX XXX XXXX</li>
              <li>Monday – Sunday</li>
            </ul>
          </div>

        </div>

        {/* Socials */}
        <div className="border-t border-slate-700 mt-12 pt-8">

          <h3 className="text-center text-xl font-semibold mb-6">
            Follow Us
          </h3>

          <div className="flex flex-wrap justify-center gap-6 text-gray-400">

            <a href="https://web.facebook.com/richiesalvation" className="hover:text-white transition">
              Facebook
            </a>

            <a href="#" className="hover:text-white transition">
              Instagram
            </a>

            <a href="#" className="hover:text-white transition">
              X (Twitter)
            </a>

            <a href="#" className="hover:text-white transition">
              TikTok
            </a>

            <a href="#" className="hover:text-white transition">
              LinkedIn
            </a>

          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-950 py-6 px-6">

        <div className="max-w-7xl mx-auto text-center">

          <p className="text-gray-400 mb-3">
            © 2026 PaddyBot. All rights reserved.
          </p>

          <p className="text-sm text-gray-500 max-w-4xl mx-auto leading-6">
            Friendly conversations, reminders, and celebration services.
            PaddyBot does not provide professional therapy, mental health
            counseling, or medical services.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
