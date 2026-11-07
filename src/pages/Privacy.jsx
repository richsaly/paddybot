
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LiveChat from "../components/LiveChat";

function Privacy() {
  return (
    <>
      <Navbar />

      <LiveChat />

      <section className="bg-slate-100 min-h-screen py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
              Privacy Policy
            </h1>

            <p className="text-gray-500 mt-4">
              Last Updated: June 2026
            </p>
          </div>

          {/* Introduction */}
          <div className="space-y-8 text-gray-700 leading-8">

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                1. Introduction
              </h2>

              <p>
                PaddyBOT is committed to protecting your privacy and personal
                information. This Privacy Policy explains how we collect, use,
                store, and protect information when you use our companion call,
                shout-out call, reminder call, and related communication
                services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                2. Information We Collect
              </h2>

              <p>
                We may collect information such as:
              </p>

              <ul className="list-disc ml-6 mt-3 space-y-2">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Booking and scheduling information</li>
                <li>Communication preferences</li>
                <li>Technical information such as browser and device details</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                3. How We Use Your Information
              </h2>

              <ul className="list-disc ml-6 space-y-2">
                <li>Provide and manage PaddyBOT services</li>
                <li>Schedule and deliver calls</li>
                <li>Send service notifications and reminders</li>
                <li>Improve user experience and platform performance</li>
                <li>Respond to customer support requests</li>
                <li>Maintain platform security and prevent misuse</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                4. Data Protection
              </h2>

              <p>
                We implement reasonable technical and organizational measures
                to safeguard your information from unauthorized access,
                alteration, disclosure, or destruction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                5. Confidentiality
              </h2>

              <p>
                PaddyBOT respects user privacy. Information shared during
                bookings and communications is treated with professionalism and
                discretion. We do not sell personal information to third
                parties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                6. Third-Party Services
              </h2>

              <p>
                We may use trusted third-party providers for payment
                processing, messaging, hosting, analytics, and communication
                services. These providers are expected to maintain appropriate
                security and privacy standards.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                7. Your Rights
              </h2>

              <p>
                You may request access to, correction of, or deletion of your
                personal information, subject to applicable laws and operational
                requirements.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                8. Cookies & Analytics
              </h2>

              <p>
                PaddyBOT may use cookies and analytics tools to understand how
                visitors interact with our platform and to improve our
                services. You can manage cookie preferences through your
                browser settings.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                9. Changes to This Policy
              </h2>

              <p>
                We may update this Privacy Policy from time to time. Any
                changes will be posted on this page with an updated revision
                date.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                10. Contact Us
              </h2>

              <p>
                If you have questions about this Privacy Policy, please contact
                us through our support channels or via email:
              </p>

              <p className="mt-3 font-semibold text-red-500">
                hello@paddybot.com
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl mt-10">
              <h3 className="font-bold text-red-600 mb-2">
                Important Disclaimer
              </h3>

              <p>
                PaddyBOT provides friendly conversations, reminder services,
                and personalized shout-out calls. PaddyBOT does not provide
                professional therapy, mental health counseling, medical advice,
                diagnosis, treatment, or emergency services.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Privacy;
