import React, { useEffect, useState } from "react";
import LiveChat from "../components/LiveChat";
import { auth, db } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs, onSnapshot, } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Link } from "react-router-dom";
import { FaUserFriends, FaBirthdayCake, FaBell, FaSignOutAlt, } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;

        if (!user) return;

        const docRef = doc(db, "users", user.uid);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  // PASTE HERE
  useEffect(() => {
    const user = auth.currentUser;

    if (!user) return;

    const companionQuery = query(
      collection(db, "companionCalls"),
      where("userId", "==", user.uid),
    );

    const shoutoutQuery = query(
      collection(db, "shoutOutCalls"),
      where("userId", "==", user.uid),
    );

    const reminderQuery = query(
      collection(db, "reminderCalls"),
      where("userId", "==", user.uid),
    );

    let companionBookings = [];
    let shoutoutBookings = [];
    let reminderBookings = [];

    const updateBookings = () => {
      const allBookings = [
        ...companionBookings,
        ...shoutoutBookings,
        ...reminderBookings,
      ];

      allBookings.sort((a, b) => {
        const dateA = new Date(
          a.date || a.deliveryDate || a.reminderDate || "2099-12-31",
        );

        const dateB = new Date(
          b.date || b.deliveryDate || b.reminderDate || "2099-12-31",
        );

        return dateA - dateB;
      });

      const upcomingOnly = allBookings.filter(
        (booking) => booking.status === "pending",
      );

      setUpcomingBookings(upcomingOnly);

      setStats({
        total: allBookings.length,
        pending: allBookings.filter((b) => b.status === "pending").length,
        completed: allBookings.filter((b) => b.status === "completed").length,
      });
    };

    const unsubscribeCompanion = onSnapshot(companionQuery, (snapshot) => {
      companionBookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        serviceType: "Companion Call",
        ...doc.data(),
      }));

      updateBookings();
    });

    const unsubscribeShoutout = onSnapshot(shoutoutQuery, (snapshot) => {
      shoutoutBookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        serviceType: "Shout-Out Call",
        ...doc.data(),
      }));

      updateBookings();
    });

    const unsubscribeReminder = onSnapshot(reminderQuery, (snapshot) => {
      reminderBookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        serviceType: "Reminder Call",
        ...doc.data(),
      }));

      updateBookings();
    });

    return () => {
      unsubscribeCompanion();
      unsubscribeShoutout();
      unsubscribeReminder();
    };
  }, []);
  // END HERE

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";

    return "Good Evening";
  };

  const formatActivityDate = (dateString) => {
    if (!dateString) return "No Date";

    return new Date(dateString).toLocaleDateString("en-NG", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleActivityClick = (booking) => {
    navigate(`/dashboard/history?id=${booking.id}`);
  };

  return (
    <DashboardLayout>
      <LiveChat />
      <section className=" min-h-screen bg-gray-100 p-4 md:p-10">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-white rounded-3xl shadow-md p-6 mb-8 animate-pulse">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
              {getGreeting()}, {userData?.fullName?.split(" ")[0] || "User"} 👋
            </h1>

            <p className="text-gray-500 mt-2">Welcome back to PaddyBot</p>
          </div>

          {/* Quick Actions */}
          <h2 className="text-xl font-semibold mb-4">
            Quick Actions, What are we doing today?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-gray-500 text-sm">Total Bookings</h3>

              <p className="text-3xl font-bold text-red-500 mt-2">
                {stats.total}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-gray-500 text-sm">Pending</h3>

              <p className="text-3xl font-bold text-yellow-500 mt-2">
                {stats.pending}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-gray-500 text-sm">Completed</h3>

              <p className="text-3xl font-bold text-green-500 mt-2">
                {stats.completed}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Link
              to="/dashboard/companion-call"
              className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer block"
            >
              <FaUserFriends className="text-red-500 text-4xl mb-4" />

              <h3 className="font-bold text-lg">Companion Call</h3>

              <p className="text-gray-500 text-sm mt-2">
                Never feel lonely again, light up your mood with a friendly
                conversation.
              </p>
            </Link>
            {/* here */}

            <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer">
              <FaBirthdayCake className="text-red-500 text-4xl mb-4" />

              <Link
                to="/dashboard/shoutout-call"
                className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 block"
              >
                <h3 className="font-bold text-lg">Shout-Out Call</h3>

                <p className="text-gray-500 text-sm mt-2">
                  Celebrate someone special.
                </p>
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer">
              <FaBell className="text-red-500 text-4xl mb-4" />

              <Link
                to="/dashboard/reminder-call"
                className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 block"
              >
                <h3 className="font-bold text-lg">Reminder Call</h3>

                <p className="text-gray-500 text-sm mt-2">
                  Never miss important tasks. Let us plan your calender with you
                </p>
              </Link>
            </div>
          </div>

          {/* Upcoming Activities */}
          <div className="bg-white rounded-3xl shadow-md p-6 mb-8">
            <h2 className="font-bold text-xl mb-4">Upcoming Activities</h2>

            {upcomingBookings.length === 0 ? (
              <p className="text-gray-500">
                You have not scheduled any activity yet.
              </p>
            ) : (
              <div className="space-y-4">
                {upcomingBookings.slice(0, 5).map((booking) => (
                  <div
                    key={booking.id}
                    onClick={() => handleActivityClick(booking)}
                    className="border-l-4 border-red-500 pl-4 py-2 hover:bg-gray-50 hover:shadow-md rounded-r-lg transition cursor-pointer"
                  >
                    <h3 className="font-semibold flex items-center gap-2">
                      {booking.serviceType === "Companion Call"
                        ? "📞"
                        : booking.serviceType === "Shout-Out Call"
                          ? "🎉"
                          : "⏰"}

                      {booking.serviceType}
                    </h3>

                    <div className="text-sm text-gray-500 mt-1">
                      <p>
                        Date:{" "}
                        {formatActivityDate(
                          booking.date ||
                            booking.deliveryDate ||
                            booking.reminderDate,
                        )}
                      </p>

                      {booking.time && <p>Time: {booking.time}</p>}
                    </div>

                    {/* also added */}

                    <div className="mt-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
    ${
      booking.status === "pending"
        ? "bg-yellow-100 text-yellow-700"
        : booking.status === "completed"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
    }`}
                      >
                        {booking.status
                          ? booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)
                          : "Pending"}
                      </span>

                      <p className="text-xs text-red-500 mt-2">
                        Tap to view details →
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Account Summary */}
          <div className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="font-bold text-xl mb-4">Account Summary</h2>

            <div className="space-y-3">
              <p>
                <span className="font-semibold">Full Name:</span>{" "}
                {userData?.fullName}
              </p>

              <p>
                <span className="font-semibold">Email:</span> {userData?.email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
