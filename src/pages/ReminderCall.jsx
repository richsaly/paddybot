import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import LiveChat from "../components/LiveChat";
import { auth, db } from "../firebase/firebaseConfig";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

function ReminderCall() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    phone: "",
    reminderDate: "",
    reminderTime: "",
    reminderMessage: "",
    repeat: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const user = auth.currentUser;

      const bookingRef = await addDoc(
        collection(db, "reminderCalls"),
        {
          serviceType: "Reminder Call",

          userId: user.uid,
          email: user.email,

          title: formData.title,
          phone: formData.phone,
          reminderDate: formData.reminderDate,
          reminderTime: formData.reminderTime,
          reminderMessage: formData.reminderMessage,
          repeat: formData.repeat,

          status: "pending",

          createdAt: serverTimestamp(),
        }
      );

      // Wait a few seconds so the user can see the processing animation
      await new Promise((resolve) =>
        setTimeout(resolve, 2500)
      );

      navigate("/dashboard/booking-success", {
        state: {
          booking: {
            id: bookingRef.id,
            serviceType: "Reminder Call",

            title: formData.title,
            phone: formData.phone,
            reminderDate: formData.reminderDate,
            reminderTime: formData.reminderTime,
            reminderMessage: formData.reminderMessage,
            repeat: formData.repeat,

            price: 2500,
          },
        },
      });

      setFormData({
        title: "",
        phone: "",
        reminderDate: "",
        reminderTime: "",
        reminderMessage: "",
        repeat: "",
      });

    } catch (error) {
      console.log(error);

      setLoading(false);

      alert("Failed to schedule reminder.");
    }
  };

  return (
    <DashboardLayout>
      <LiveChat />

      {/* LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">

          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">

            {/* Spinner */}
            <div className="w-16 h-16 mx-auto mb-6 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin"></div>

            <h2 className="text-xl font-bold text-gray-900">
              Processing Your Booking
            </h2>

            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Please wait while we securely book your reminder booking.
            </p>

            <div className="flex items-center justify-center gap-1 mt-5">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
              <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
            </div>

            <p className="text-xs text-gray-400 mt-5">
              Please do not close or refresh this page.
            </p>

          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-3xl shadow-md p-8">

          <h1 className="text-3xl font-bold mb-2">
            ⏰ Reminder Call
          </h1>

          <p className="text-gray-500 mb-8">
            Never miss important events again.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Reminder Title"
              className="w-full border p-4 rounded-xl"
              required
              disabled={loading}
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border p-4 rounded-xl"
              required
              disabled={loading}
            />

            <input
              type="date"
              name="reminderDate"
              value={formData.reminderDate}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
              disabled={loading}
            />

            <input
              type="time"
              name="reminderTime"
              value={formData.reminderTime}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
              disabled={loading}
            />

            <select
              name="repeat"
              value={formData.repeat}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
              disabled={loading}
            >
              <option value="">
                Repeat Option
              </option>

              <option value="Once">
                Once
              </option>

              <option value="Daily">
                repeat twice
              </option>

              <option value="Weekly">
                5 minutes before time
              </option>

              <option value="Monthly">
                10 minutes before time
              </option>
            </select>

            <textarea
              rows="5"
              name="reminderMessage"
              value={formData.reminderMessage}
              onChange={handleChange}
              placeholder="Reminder Message"
              className="w-full border p-4 rounded-xl"
              required
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white px-8 py-4 rounded-xl transition font-semibold ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {loading
                ? "Processing Booking..."
                : "Schedule Reminder"}
            </button>

          </form>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default ReminderCall;