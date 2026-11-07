import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { auth, db } from "../firebase/firebaseConfig";
import LiveChat from "../components/LiveChat";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

function ShoutOutCall() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    recipientName: "",
    recipientPhone: "",
    occasion: "",
    deliveryDate: "",
    deliveryTime: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const user = auth.currentUser;

//     if (!user) {
//       alert("Please login before booking.");
//       return;
//     }

//     const bookingRef = await addDoc(
//       collection(db, "shoutOutCalls"),
//       {
//         serviceType: "Shout-Out Call",

//         userId: user.uid,
//         email: user.email,

//         recipientName: formData.recipientName,
//         recipientPhone: formData.recipientPhone,
//         occasion: formData.occasion,
//         deliveryDate: formData.deliveryDate,
//         deliveryTime: formData.deliveryTime,
//         message: formData.message,

//         price: 2500,

//         status: "pending",

//         createdAt: serverTimestamp(),
//       }
//     );

//     // Booking information to carry to the success/payment flow
//     const booking = {
//       id: bookingRef.id,

//       serviceType: "Shout-Out Call",

//       recipientName: formData.recipientName,
//       recipientPhone: formData.recipientPhone,
//       occasion: formData.occasion,
//       deliveryDate: formData.deliveryDate,
//       deliveryTime: formData.deliveryTime,
//       message: formData.message,

//       price: 2500,

//       status: "pending",
//     };

//     // Go to booking success page
//     navigate("/dashboard/booking-success", {
//       state: {
//         booking,
//       },
//     });

//   } catch (error) {
//     console.log(error);

//     alert("Failed to schedule shout-out");
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    const user = auth.currentUser;

    const bookingRef = await addDoc(
      collection(db, "shoutOutCalls"),
      {
        serviceType: "Shout-Out Call",

        userId: user.uid,

        recipientName: formData.recipientName,

        recipientPhone: formData.recipientPhone,

        occasion: formData.occasion,

        deliveryDate: formData.deliveryDate,

        deliveryTime: formData.deliveryTime,

        message: formData.message,

        status: "pending",

        createdAt: serverTimestamp(),
      }
    );

    // Standard Shout-Out price
    const price = 2500;

    // Keep loading visible for a short moment
    await new Promise((resolve) =>
      setTimeout(resolve, 2500)
    );

    navigate("/dashboard/booking-success", {
      state: {
        booking: {
          id: bookingRef.id,
          serviceType: "Shout-Out Call",
          recipientName: formData.recipientName,
          recipientPhone: formData.recipientPhone,
          occasion: formData.occasion,
          deliveryDate: formData.deliveryDate,
          deliveryTime: formData.deliveryTime,
          message: formData.message,
          price: price,
        },
      },
    });

    setFormData({
      recipientName: "",
      recipientPhone: "",
      occasion: "",
      deliveryDate: "",
      deliveryTime: "",
      message: "",
    });

  } catch (error) {
    console.log(error);

    setLoading(false);

    alert("Failed to schedule shout-out");
  }
};

  return (
    <DashboardLayout>
      <LiveChat />

      {loading && (
  <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center">

    <div className="bg-white rounded-3xl shadow-2xl p-8 w-[90%] max-w-sm text-center">

      <div className="w-16 h-16 mx-auto mb-6 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin"></div>

      <h2 className="text-xl font-bold text-gray-900">
        Processing Your Booking
      </h2>

      <p className="text-gray-500 text-sm mt-2 leading-relaxed">
        Please wait while we confirm your Shout-Out Call booking...
      </p>

      <p className="text-xs text-gray-400 mt-5">
              do not close or refresh this page.
            </p>

    </div>

  </div>
)}


      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-3xl shadow-md p-8">

          <h1 className="text-3xl font-bold mb-2">
            🎉 Shout-Out Call
          </h1>

          <p className="text-gray-500 mb-8">
            Make someone's day special.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              placeholder="Recipient Name"
              className="w-full border p-4 rounded-xl"
              required
            />

            <input
              type="tel"
              name="recipientPhone"
              value={formData.recipientPhone}
              onChange={handleChange}
              placeholder="Recipient Phone Number"
              className="w-full border p-4 rounded-xl"
              required
            />

            <select
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            >
              <option value="">
                Select Occasion
              </option>

              <option>
                Birthday
              </option>

              <option>
                Anniversary
              </option>

              <option>
                Graduation
              </option>

              <option>
                Appreciation
              </option>

              <option>
                Romantic Surprise
              </option>

              <option>
                Apology/makeup call
              </option>

              <option>
                Congratulatory call
              </option>

              <option>
                Condolence 
              </option>

              <option>
                Friendship request
              </option>

              <option>
                Other
              </option>
            </select>

            <input
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            />

            <input
              type="time"
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            />

            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write more message about your shout-out..."
              className="w-full border p-4 rounded-xl"
              required
            />

            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl transition"
            >
              Schedule Shout-Out
            </button>

          </form>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default ShoutOutCall;