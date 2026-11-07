import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { auth } from "../firebase/firebaseConfig";

function PricingPayment() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;
    const [loading, setLoading] = useState(false);

      const handlePayment = async () => {
    if (!booking) {
      alert("No booking selected.");
      return;
    }

    if (!auth.currentUser) {
  alert("Your session has expired. Please sign in again.");
  return;
}

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:5001/paddybot-a3f6d/us-central1/initializePaystackPayment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // email: booking.email,
            email: auth.currentUser?.email,
            amount: booking.price,
            bookingId: booking.id,
            serviceType: booking.serviceType,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to initialize payment."
        );
      }

      // Send the user to Paystack checkout
      window.location.href = result.data.authorization_url;
    } catch (error) {
      console.error("Payment initialization failed:", error);

      alert(
        error.message || "Unable to start payment. Please try again."
      );

      setLoading(false);
    }
  };

  // If no booking was passed to this page
  if (!booking) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-md p-8 md:p-10 text-center">

            <div className="text-5xl mb-5">
              💳
            </div>

            <h1 className="text-2xl md:text-3xl font-bold">
              No Booking Selected
            </h1>

            <p className="text-gray-500 mt-3">
              Please make a booking first before proceeding to payment.
            </p>

            <button
              onClick={() => navigate("/dashboard")}
              className="mt-8 bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-xl transition"
            >
              Back to Dashboard
            </button>

          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="text-5xl mb-4">
            💳
          </div>

          <h1 className="text-3xl md:text-4xl font-bold">
            Payment
          </h1>

          <p className="text-gray-500 mt-3">
            Review your booking details before making payment.
          </p>

        </div>

        {/* Booking & Payment Summary */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">

          {/* Service Header */}
          <div className="bg-gray-50 p-6 border-b">

            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-4">

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl
                  ${
                    booking.serviceType === "Companion Call"
                      ? "bg-blue-100"
                      : booking.serviceType === "Shout-Out Call"
                        ? "bg-purple-100"
                        : "bg-green-100"
                  }`}
                >
                  {booking.serviceType === "Companion Call"
                    ? "📞"
                    : booking.serviceType === "Shout-Out Call"
                      ? "🎉"
                      : "⏰"}
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    {booking.serviceType}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Booking Payment
                  </p>
                </div>

              </div>

              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                Pending
              </span>

            </div>

          </div>

          {/* Booking Details */}
          <div className="p-6">

            <h3 className="text-lg font-bold mb-5">
              Booking Summary
            </h3>

            <div className="bg-gray-50 rounded-2xl p-5 space-y-4">

              {/* Companion Call */}
              {booking.serviceType === "Companion Call" && (
                <>
                  {booking.duration && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        Duration
                      </span>

                      <span className="font-semibold text-right">
                        {booking.duration}
                      </span>
                    </div>
                  )}

                  {booking.conversationType && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        Conversation
                      </span>

                      <span className="font-semibold text-right">
                        {booking.conversationType}
                      </span>
                    </div>
                  )}

                  {booking.date && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        Date
                      </span>

                      <span className="font-semibold text-right">
                        {booking.date}
                      </span>
                    </div>
                  )}

                  {booking.time && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        Time
                      </span>

                      <span className="font-semibold text-right">
                        {booking.time}
                      </span>
                    </div>
                  )}

                  {booking.phone && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        Phone
                      </span>

                      <span className="font-semibold text-right">
                        {booking.phone}
                      </span>
                    </div>
                  )}

                  {booking.notes && (
                    <div>
                      <span className="text-gray-500 block mb-1">
                        Additional Notes
                      </span>

                      <p className="font-medium text-gray-800 bg-white rounded-xl p-3">
                        {booking.notes}
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Shout-Out Call */}
              {booking.serviceType === "Shout-Out Call" && (
                <>
                  {booking.recipientName && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        Recipient
                      </span>

                      <span className="font-semibold text-right">
                        {booking.recipientName}
                      </span>
                    </div>
                  )}

                  {booking.recipientPhone && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        Recipient Phone
                      </span>

                      <span className="font-semibold text-right">
                        {booking.recipientPhone}
                      </span>
                    </div>
                  )}

                  {booking.occasion && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        Occasion
                      </span>

                      <span className="font-semibold text-right">
                        {booking.occasion}
                      </span>
                    </div>
                  )}

                  {booking.deliveryDate && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        Delivery Date
                      </span>

                      <span className="font-semibold text-right">
                        {booking.deliveryDate}
                      </span>
                    </div>
                  )}

                  {booking.deliveryTime && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        Delivery Time
                      </span>

                      <span className="font-semibold text-right">
                        {booking.deliveryTime}
                      </span>
                    </div>
                  )}

                  {booking.message && (
                    <div>
                      <span className="text-gray-500 block mb-1">
                        Message
                      </span>

                      <p className="font-medium text-gray-800 bg-white rounded-xl p-3">
                        {booking.message}
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Reminder Call */}
              {booking.serviceType === "Reminder Call" && (
                <>
                  {booking.title && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        Title
                      </span>

                      <span className="font-semibold text-right">
                        {booking.title}
                      </span>
                    </div>
                  )}

                  {booking.phone && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        Phone
                      </span>

                      <span className="font-semibold text-right">
                        {booking.phone}
                      </span>
                    </div>
                  )}

                  {booking.reminderDate && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        Reminder Date
                      </span>

                      <span className="font-semibold text-right">
                        {booking.reminderDate}
                      </span>
                    </div>
                  )}

                  {booking.reminderTime && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        Reminder Time
                      </span>

                      <span className="font-semibold text-right">
                        {booking.reminderTime}
                      </span>
                    </div>
                  )}

                  {booking.repeat && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        Repeat
                      </span>

                      <span className="font-semibold text-right">
                        {booking.repeat}
                      </span>
                    </div>
                  )}

                  {booking.reminderMessage && (
                    <div>
                      <span className="text-gray-500 block mb-1">
                        Reminder Message
                      </span>

                      <p className="font-medium text-gray-800 bg-white rounded-xl p-3">
                        {booking.reminderMessage}
                      </p>
                    </div>
                  )}
                </>
              )}

            </div>

            {/* Amount */}
            <div className="border-t mt-6 pt-6">

              <div className="flex justify-between items-center">

                <div>
                  <p className="text-gray-500 text-sm">
                    Total Amount
                  </p>

                  <p className="font-semibold mt-1">
                    {booking.serviceType}
                  </p>
                </div>

                <span className="text-3xl font-bold text-red-600">
                  ₦{booking.price?.toLocaleString() || "0"}
                </span>

              </div>

            </div>

            {/* Payment Button */}
            <button
  onClick={handlePayment}
  disabled={loading}
  className={`w-full mt-8 text-white font-bold py-4 rounded-xl transition ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-red-500 hover:bg-red-600"
  }`}
>
  {loading ? "Preparing Payment..." : `Pay ₦${booking.price?.toLocaleString() || "0"}`}
</button>

            {/* <button
              className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl transition"
            >
              Pay ₦{booking.price?.toLocaleString() || "0"}
            </button> */}

          </div>

        </div>

        {/* Payment Notice */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mt-6">

          <p className="text-sm text-gray-600 text-center">
            🔒 Your payment will be processed securely.
          </p>

        </div>

        {/* Back */}
        <div className="text-center mt-6">

          <button
            onClick={() => navigate("/dashboard/history")}
            className="text-gray-500 hover:text-gray-800 text-sm"
          >
            ← Back to My Bookings
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default PricingPayment;