import { useRef } from "react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { auth, db } from "../firebase/firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { formatTime } from "../utils/formatTime";


function History() {
  const location = useLocation();
  // pay attention
  const queryParams = new URLSearchParams(location.search);

  const selectedBookingId = queryParams.get("id");

  const selectedRef = useRef(null);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [bookings]);

  useEffect(() => {
  const user = auth.currentUser;

  if (!user) return;

  let companionBookings = [];
  let shoutOutBookings = [];
  let reminderBookings = [];

  const updateBookings = () => {
    const allBookings = [
      ...companionBookings,
      ...shoutOutBookings,
      ...reminderBookings,
    ];

    allBookings.sort(
      (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
    );

    setBookings(allBookings);
    setLoading(false);
  };

  const unsubscribeCompanion = onSnapshot(
    query(
      collection(db, "companionCalls"),
      where("userId", "==", user.uid)
    ),
    (snapshot) => {
      companionBookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      updateBookings();
    }
  );

  const unsubscribeShoutOut = onSnapshot(
    query(
      collection(db, "shoutOutCalls"),
      where("userId", "==", user.uid)
    ),
    (snapshot) => {
      shoutOutBookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      updateBookings();
    }
  );

  const unsubscribeReminder = onSnapshot(
    query(
      collection(db, "reminderCalls"),
      where("userId", "==", user.uid)
    ),
    (snapshot) => {
      reminderBookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      updateBookings();
    }
  );

  return () => {
    unsubscribeCompanion();
    unsubscribeShoutOut();
    unsubscribeReminder();
  };
}, []);

  // useEffect(() => {
  //   const fetchBookings = async () => {
  //     try {
  //       const user = auth.currentUser;

  //       if (!user) return;

  //       // Companion Calls
  //       const companionQuery = query(
  //         collection(db, "companionCalls"),
  //         where("userId", "==", user.uid),
  //       );

  //       const companionSnapshot = await getDocs(companionQuery);

  //       const companionBookings = companionSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       // Shout Out Calls
  //       const shoutOutQuery = query(
  //         collection(db, "shoutOutCalls"),
  //         where("userId", "==", user.uid),
  //       );

  //       const shoutOutSnapshot = await getDocs(shoutOutQuery);

  //       const shoutOutBookings = shoutOutSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       // Reminder Calls
  //       const reminderQuery = query(
  //         collection(db, "reminderCalls"),
  //         where("userId", "==", user.uid),
  //       );

  //       const reminderSnapshot = await getDocs(reminderQuery);

  //       const reminderBookings = reminderSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       // Merge All Bookings
  //       const allBookings = [
  //         ...companionBookings,
  //         ...shoutOutBookings,
  //         ...reminderBookings,
  //       ];

  //       allBookings.sort(
  //         (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
  //       );

  //       setBookings(allBookings);
  //     } catch (error) {
  //       console.log(error);
  //     }

  //     setLoading(false);
  //   };

  //   fetchBookings();
  // }, []);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Booking History</h1>

        <p className="text-gray-500 mb-8">View all your scheduled services.</p>

        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow">
            <p>No bookings found.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* replace */}

            {bookings.map((booking) => (
              // <div
              //   key={booking.id}

              <div
                key={booking.id}
                ref={booking.id === selectedBookingId ? selectedRef : null}
                className={`bg-white rounded-2xl p-6 shadow hover:shadow-lg transition
${booking.id === selectedBookingId ? "ring-4 ring-red-500" : ""}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-xl">
                    {booking.serviceType === "Companion Call"
                      ? "📞 Companion Call"
                      : booking.serviceType === "Shout-Out Call"
                        ? "🎉 Shout-Out Call"
                        : "⏰ Reminder Call"}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
    ${
      booking.serviceType === "Companion Call"
        ? "bg-blue-100 text-blue-700"
        : booking.serviceType === "Shout-Out Call"
          ? "bg-purple-100 text-purple-700"
          : "bg-green-100 text-green-700"
    }`}
                  >
                    {booking.serviceType}
                  </span>
                </div>

                {booking.serviceType === "Companion Call" && (
                  <>
                    <p>
                      <strong>Date:</strong> {booking.date}
                    </p>

                    <p>
                      <strong>Time:</strong> {formatTime(booking.time)}
                    </p>

                    <p>
                      <strong>Duration:</strong> {booking.duration}
                    </p>
                  </>
                )}

                {booking.serviceType === "Shout-Out Call" && (
                  <>
                    <p>
                      <strong>Recipient:</strong> {booking.recipientName}
                    </p>

                    <p>
                      <strong>Occasion:</strong> {booking.occasion}
                    </p>

                    <p>
                      <strong>Date:</strong> {booking.deliveryDate}
                    </p>
                  </>
                )}

                {booking.serviceType === "Reminder Call" && (
                  <>
                    <p>
                      <strong>Title:</strong> {booking.title}
                    </p>

                    <p>
                      <strong>Date:</strong> {booking.reminderDate}
                    </p>

                    <p>
                      <strong>Repeat:</strong> {booking.repeat}
                    </p>
                  </>
                )}

                <p>
                  Status:{" "}
                  {booking.status
                    ? booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)
                    : "Pending"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default History;
