import LiveChat from "../components/LiveChat";
import DashboardLayout from "../components/DashboardLayout";
import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CompanionCall() {
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    date: "",
    time: "",
    duration: "",
    conversationType: "",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    const user = auth.currentUser;

    const bookingRef = await addDoc(
      collection(db, "companionCalls"),
      {
        serviceType: "Companion Call",
        userId: user.uid,
        email: user.email,

        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        conversationType: formData.conversationType,
        notes: formData.notes,

        status: "pending",

        createdAt: serverTimestamp(),
      }
    );

    let price = 0;

    if (formData.duration === "10 Minutes") {
      price = 2000;
    } else if (formData.duration === "20 Minutes") {
      price = 3000;
    } else if (formData.duration === "30 Minutes") {
      price = 4000;
    } else if (formData.duration === "60 Minutes") {
      price = 5000;
    }

    // Give React enough time to display the loading overlay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    navigate("/dashboard/booking-success", {
      state: {
        booking: {
          id: bookingRef.id,
          serviceType: "Companion Call",
          duration: formData.duration,
          conversationType: formData.conversationType,
          notes: formData.notes,
          date: formData.date,
          time: formData.time,
          phone: formData.phone,
          price: price,
        },
      },
    });

    setFormData({
      phone: "",
      date: "",
      time: "",
      duration: "",
      conversationType: "",
      notes: "",
    });

  } catch (error) {
    console.log(error);

    setLoading(false);

    alert("Booking failed");
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
               Please wait while we confirm your Companion Call booking...
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
          <h1 className="text-3xl font-bold mb-2">Companion Call</h1>

          <p className="text-gray-500 mb-8">
            Schedule a friendly conversation with PaddyBot.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border p-4 rounded-xl"
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
            />

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
            />

            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
            >
              <option>Select Duration</option>

              <option>10 Minutes</option>

              <option>20 Minutes</option>

              <option>30 Minutes</option>

              <option>60 Minutes</option>
            </select>

            <select
              name="conversationType"
              value={formData.conversationType}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
            >
              <option>Conversation Type</option>

              <option>Friendly Chat</option>

              <option>Companion Gist</option>

              <option>Relationship Support</option>

              <option>Late Night Talk</option>

              <option>Play me some music</option>

              <option>Latest Updates</option>
            </select>

            <textarea
              rows="5"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional Notes..."
              className="w-full border p-4 rounded-xl"
            />

            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl transition"
            >
              Book Companion Call
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CompanionCall;
