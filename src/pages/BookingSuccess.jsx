import DashboardLayout from "../components/DashboardLayout";
import { useNavigate, useLocation } from "react-router-dom";

function BookingSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

const booking = location.state?.booking;

  return (
    <DashboardLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 max-w-xl w-full text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
            <span className="text-4xl">✓</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Booking Successful!
          </h1>

          <p className="text-gray-500 mt-4 leading-relaxed">
            Your booking has been received successfully. We will process your
            request and keep you updated.
          </p>

          {/* Booking Status */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mt-8">
            <p className="text-sm text-gray-500">Booking Status</p>

            <p className="text-lg font-semibold text-yellow-600 mt-1">
              Pending
            </p>
          </div>

          {/* Booking Details */}

          {booking && (
  <div className="bg-gray-50 rounded-2xl p-5 mt-5 text-left">
    <h2 className="font-bold text-lg mb-4">
      Booking Details
    </h2>

    <div className="space-y-2 text-sm">

      <p>
        <strong>Service:</strong>{" "}
        {booking.serviceType}
      </p>

      {/* Companion Call */}
      {booking.duration && (
        <p>
          <strong>Duration:</strong>{" "}
          {booking.duration}
        </p>
      )}

      {booking.conversationType && (
        <p>
          <strong>Conversation Type:</strong>{" "}
          {booking.conversationType}
        </p>
      )}

      {booking.date && (
        <p>
          <strong>Date:</strong>{" "}
          {booking.date}
        </p>
      )}

      {booking.time && (
        <p>
          <strong>Time:</strong>{" "}
          {booking.time}
        </p>
      )}

      {/* Shout-Out Call */}
      {booking.recipientName && (
        <p>
          <strong>Recipient:</strong>{" "}
          {booking.recipientName}
        </p>
      )}

      {booking.occasion && (
        <p>
          <strong>Occasion:</strong>{" "}
          {booking.occasion}
        </p>
      )}

      {booking.deliveryDate && (
        <p>
          <strong>Delivery Date:</strong>{" "}
          {booking.deliveryDate}
        </p>
      )}

      {booking.deliveryTime && (
        <p>
          <strong>Delivery Time:</strong>{" "}
          {booking.deliveryTime}
        </p>
      )}

      {/* Reminder Call */}
      {booking.title && (
        <p>
          <strong>Title:</strong>{" "}
          {booking.title}
        </p>
      )}

      {booking.reminderDate && (
        <p>
          <strong>Reminder Date:</strong>{" "}
          {booking.reminderDate}
        </p>
      )}

      {booking.reminderTime && (
        <p>
          <strong>Reminder Time:</strong>{" "}
          {booking.reminderTime}
        </p>
      )}

      {booking.repeat && (
        <p>
          <strong>Repeat:</strong>{" "}
          {booking.repeat}
        </p>
      )}

      {booking.price && (
        <p>
          <strong>Price:</strong>{" "}
          ₦{booking.price.toLocaleString()}
        </p>
      )}

    </div>
  </div>
)}

{/* {booking && (
  <div className="bg-gray-50 rounded-2xl p-5 mt-5 text-left">

    <h2 className="font-bold text-lg mb-4">
      Booking Details
    </h2>

    <div className="space-y-2 text-sm">

      <p>
        <strong>Service:</strong>{" "}
        {booking.serviceType}
      </p>

      {booking.duration && (
        <p>
          <strong>Duration:</strong>{" "}
          {booking.duration}
        </p>
      )}

      {booking.price && (
        <p>
          <strong>Price:</strong>{" "}
          ₦{booking.price.toLocaleString()}
        </p>
      )}

      {booking.date && (
        <p>
          <strong>Date:</strong>{" "}
          {booking.date}
        </p>
      )}

      {booking.time && (
        <p>
          <strong>Time:</strong>{" "}
          {booking.time}
        </p>
      )}

      {booking.conversationType && (
        <p>
          <strong>Conversation Type:</strong>{" "}
          {booking.conversationType}
        </p>
      )}

    </div>

  </div>
)} */}

          {/* Buttons */}
          <div className="flex flex-col gap-3 mt-8">
            <button
            //   onClick={() => navigate("/dashboard/pricing-payment")}
            onClick={() =>
  navigate("/dashboard/pricing-payment", {
    state: {
      booking,
    },
  })
}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Proceed to Payment
            </button>

            <button
              onClick={() => navigate("/dashboard/history")}
              className="w-full border border-gray-300 hover:bg-gray-700 hover:text-white py-3 rounded-xl transition"
            >
              View My Bookings
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="text-blue-500 hover:text-gray-700 text-sm font-semibold mt-2 "
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default BookingSuccess;
