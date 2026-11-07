import DashboardLayout from "../components/DashboardLayout";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { formatTime } from "../utils/formatTime";
import {
  collection,
  onSnapshot,
  query,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
} from "chart.js";

import { Doughnut, Line, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
);

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  const [users, setUsers] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
  });

  const [serviceStats, setServiceStats] = useState({
    companion: 0,
    shoutout: 0,
    reminder: 0,
  });

  // bring back
  const chartData = {
    labels: ["Companion Calls", "Shout-Out Calls", "Reminder Calls"],
    datasets: [
      {
        data: [
          serviceStats.companion,
          serviceStats.shoutout,
          serviceStats.reminder,
        ],
        backgroundColor: ["#3B82F6", "#EC4899", "#22C55E"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  const monthlyBookings = new Array(12).fill(0);

  bookings.forEach((booking) => {
    if (booking.createdAt?.seconds) {
      const month = new Date(booking.createdAt.seconds * 1000).getMonth();

      monthlyBookings[month]++;
    }
  });

  const trendData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],

    datasets: [
      {
        label: "Bookings",

        data: monthlyBookings,

        borderColor: "#ef4444",

        backgroundColor: "rgba(239,68,68,.2)",

        tension: 0.4,

        fill: true,

        pointRadius: 5,
      },
    ],
  };

  const trendOptions = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  // ends here

  // barchart data
  const barChartData = {
    labels: ["Companion", "Shout-Out", "Reminder"],

    datasets: [
      {
        label: "Bookings",

        data: [
          serviceStats.companion,
          serviceStats.shoutout,
          serviceStats.reminder,
        ],

        backgroundColor: ["#3B82F6", "#EC4899", "#22C55E"],

        borderRadius: 8,
      },
    ],
  };
  // ends here
  const barChartOptions = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  const [statusFilter, setStatusFilter] = useState("all");

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedBooking, setSelectedBooking] = useState(null);

  // new usereffect
  useEffect(() => {
    const companionQuery = query(collection(db, "companionCalls"));
    const shoutoutQuery = query(collection(db, "shoutOutCalls"));
    const reminderQuery = query(collection(db, "reminderCalls"));
    const usersQuery = query(collection(db, "users"));

    let companionBookings = [];
    let shoutoutBookings = [];
    let reminderBookings = [];
    let usersData = [];

    const updateDashboard = () => {
      const allBookings = [
        ...companionBookings,
        ...shoutoutBookings,
        ...reminderBookings,
      ];

      allBookings.sort((a, b) => {
        const dateA = new Date(
          a.createdAt?.seconds ? a.createdAt.seconds * 1000 : 0,
        );

        const dateB = new Date(
          b.createdAt?.seconds ? b.createdAt.seconds * 1000 : 0,
        );

        return dateB - dateA;
      });

      setUsers(usersData);

      setBookings(allBookings);

      setStats({
        total: allBookings.length,
        pending: allBookings.filter((b) => b.status === "pending").length,
        completed: allBookings.filter((b) => b.status === "completed").length,
        cancelled: allBookings.filter((b) => b.status === "cancelled").length,
      });

      setServiceStats({
        companion: companionBookings.length,
        shoutout: shoutoutBookings.length,
        reminder: reminderBookings.length,
      });

      setLoading(false);
    };

    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      updateDashboard();
    });

    const unsubscribeCompanion = onSnapshot(companionQuery, (snapshot) => {
      companionBookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        collectionName: "companionCalls",
        serviceType: "Companion Call",
        ...doc.data(),
      }));

      updateDashboard();
    });

    const unsubscribeShoutout = onSnapshot(shoutoutQuery, (snapshot) => {
      shoutoutBookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        collectionName: "shoutOutCalls",
        serviceType: "Shout-Out Call",
        ...doc.data(),
      }));

      updateDashboard();
    });

    const unsubscribeReminder = onSnapshot(reminderQuery, (snapshot) => {
      reminderBookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        collectionName: "reminderCalls",
        serviceType: "Reminder Call",
        ...doc.data(),
      }));

      updateDashboard();
    });

    return () => {
      unsubscribeUsers();
      unsubscribeCompanion();
      unsubscribeShoutout();
      unsubscribeReminder();
    };
  }, []);

  // get user info
  const getUserInfo = (userId) => {
    return users.find((user) => user.uid === userId || user.id === userId);
  };

  // update booking status
  const updateBookingStatus = async (collectionName, bookingId, newStatus) => {
    try {
      const bookingRef = doc(db, collectionName, bookingId);

      await updateDoc(bookingRef, {
        status: newStatus,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // delete booking
  const deleteBooking = async (collectionName, bookingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?",
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, collectionName, bookingId));

      setSelectedBooking(null);
    } catch (error) {
      console.log(error);
    }
  };

  // search bar
  const filteredBookings = bookings.filter((booking) => {
    const user = getUserInfo(booking.userId);

    const matchesSearch =
      !searchTerm ||
      user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.phoneNumber?.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // helper function
  const getActivityDate = (booking) => {
    if (!booking.createdAt?.seconds) return new Date(0);

    return new Date(booking.createdAt.seconds * 1000);
  };

  const recentActivities = [...bookings]
    .sort((a, b) => getActivityDate(b) - getActivityDate(a))
    .slice(0, 8);

  // time formatter
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);

    if (hours < 24) return `${hours} hr ago`;

    const days = Math.floor(hours / 24);

    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  // status icon helper
  const activityIcon = (status) => {
    switch (status) {
      case "completed":
        return "🟢";

      case "pending":
        return "🟡";

      case "cancelled":
        return "🔴";

      default:
        return "🔵";
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>

        <p className="text-gray-500 mb-8">Manage users and bookings.</p>
      </div>

      {/* display card starts here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">
        {/* Total Users */}
        <div className="bg-white rounded-3xl shadow hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-purple-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>

              <h2 className="text-4xl font-bold mt-2 text-purple-600">
                {users.length}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl">
              👥
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-5">Registered customers</p>
        </div>

        {/* Total Bookings */}

        <div className="bg-white rounded-3xl shadow hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-red-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Bookings</p>

              <h2 className="text-4xl font-bold mt-2 text-red-500">
                {stats.total}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-2xl">
              📋
            </div>
          </div>

          <p className="text-xs text-green-500 mt-5">● Live updates</p>
        </div>

        {/* Pending */}

        <div className="bg-white rounded-3xl shadow hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Pending</p>

              <h2 className="text-4xl font-bold mt-2 text-yellow-500">
                {stats.pending}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center text-2xl">
              ⏳
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-5">Awaiting action</p>
        </div>

        {/* Completed */}

        <div className="bg-white rounded-3xl shadow hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Completed</p>

              <h2 className="text-4xl font-bold mt-2 text-green-600">
                {stats.completed}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
              ✅
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-5">Successfully delivered</p>
        </div>

        {/* Cancelled */}

        <div className="bg-white rounded-3xl shadow hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-gray-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Cancelled</p>

              <h2 className="text-4xl font-bold mt-2 text-gray-700">
                {stats.cancelled}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl">
              ❌
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-5">Cancelled requests</p>
        </div>
      </div>
      {/* display card 1, ends here */}

      {/* analytic card */}
      <h2 className="text-2xl font-bold mb-6">Service Analytics</h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT SIDE */}

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold text-lg mb-6">Service Summary</h3>

          <div className="grid grid-cols-3 gap-6">
            <div className="text-center border-r">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-3xl">
                📞
              </div>

              <p className="mt-4 text-gray-600">Companion Calls</p>

              <h2 className="text-4xl font-bold text-blue-600 mt-2">
                {serviceStats.companion}
              </h2>
            </div>

            <div className="text-center border-r">
              <div className="w-16 h-16 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-3xl">
                🎉
              </div>

              <p className="mt-4 text-gray-600">Shout-Out Calls</p>

              <h2 className="text-4xl font-bold text-pink-600 mt-2">
                {serviceStats.shoutout}
              </h2>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center text-3xl">
                ⏰
              </div>

              <p className="mt-4 text-gray-600">Reminder Calls</p>

              <h2 className="text-4xl font-bold text-green-600 mt-2">
                {serviceStats.reminder}
              </h2>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold text-lg mb-6">Service Distribution</h3>

          <div className="h-[300px] flex items-center justify-center">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* might be here */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
        {/* Bookings by Service */}
        <div className="bg-white rounded-3xl shadow p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Bookings by Service</h2>

              <p className="text-gray-500 text-sm">
                Compare demand across all PaddyBot services.
              </p>
            </div>
          </div>

          <div className="h-[380px]">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>

        {/* Booking Trend */}
        <div className="bg-white rounded-3xl shadow p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Booking Trend</h2>

              <p className="text-gray-500 text-sm">
                Monthly booking activities.
              </p>
            </div>
          </div>

          <div className="h-[380px]">
            <Line data={trendData} options={trendOptions} />
          </div>
        </div>
      </div>

      {/* recent activities */}
      <div className="bg-white rounded-3xl shadow p-8 mt-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Recent Activities</h2>

          <button className="text-red-500 hover:text-red-600 font-semibold">
            View All →
          </button>
        </div>

        <div className="space-y-6">
          {recentActivities.map((booking) => {
            const user = getUserInfo(booking.userId);

            return (
              <div key={booking.id} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                    {activityIcon(booking.status)}
                  </div>

                  <div className="w-px h-10 bg-gray-200 mt-2"></div>
                </div>

                <div className="flex-1">
                  <p className="font-semibold">
                    {user?.fullName || "Unknown User"}
                  </p>

                  <p className="text-gray-500">
                    booked a
                    <span className="font-medium text-black">
                      {" "}
                      {booking.serviceType}
                    </span>
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    {timeAgo(getActivityDate(booking))}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* ends here */}

      <div className="bg-white p-6 rounded-2xl shadow mt-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-3 rounded-xl flex-1"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-3 rounded-xl"
          >
            <option value="all">All Statuses</option>

            <option value="pending">Pending</option>

            <option value="completed">Completed</option>

            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <h2 className="text-2xl font-bold mb-4">All Bookings</h2>

        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              onClick={() => setSelectedBooking(booking)}
              className="border p-4 rounded-xl cursor-pointer hover:shadow-md transition"
            >
              <h3 className="font-bold">{booking.serviceType}</h3>

              {(() => {
                const user = getUserInfo(booking.userId);

                return (
                  <>
                    <p>
                      <strong>Name:</strong> {user?.fullName || "Unknown User"}
                    </p>

                    <p>
                      <strong>Email:</strong> {user?.email || "N/A"}
                    </p>

                    <p>
                      <strong>Phone:</strong> {user?.phoneNumber || "N/A"}
                    </p>

                    {/* maybe here */}
                    <p>
                      <strong>Booked:</strong>{" "}
                      {booking.createdAt?.seconds
                        ? new Date(
                            booking.createdAt.seconds * 1000,
                          ).toLocaleString()
                        : "N/A"}
                    </p>
                  </>
                );
              })()}
              <p>Status: {booking.status}</p>

              <div className="flex gap-2 mt-4 flex-wrap">
                <button
                  onClick={() =>
                    updateBookingStatus(
                      booking.collectionName,
                      booking.id,
                      "pending",
                    )
                  }
                  className="bg-yellow-500 text-white px-3 py-2 rounded"
                >
                  Pending
                </button>

                <button
                  onClick={() =>
                    updateBookingStatus(
                      booking.collectionName,
                      booking.id,
                      "completed",
                    )
                  }
                  className="bg-green-500 text-white px-3 py-2 rounded"
                >
                  Complete
                </button>

                <button
                  onClick={() =>
                    updateBookingStatus(
                      booking.collectionName,
                      booking.id,
                      "cancelled",
                    )
                  }
                  className="bg-red-500 text-white px-3 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* at the bottom */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                {selectedBooking.serviceType === "Companion Call"
                  ? "📞"
                  : selectedBooking.serviceType === "Shout-Out Call"
                    ? "🎉"
                    : "⏰"}
                Booking Details
              </h2>

              <button
                onClick={() => setSelectedBooking(null)}
                className="text-red-500 font-bold text-xl"
              >
                ✕
              </button>
            </div>

            {/* replaced with */}
            <div className="grid md:grid-cols-2 gap-4">
              {(() => {
                const user = getUserInfo(selectedBooking.userId);

                const booking = selectedBooking;

                return (
                  <>
                    <p>
                      <strong>Service:</strong> {selectedBooking.serviceType}
                    </p>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Customer Name</p>

                      <p className="font-semibold">
                        {user?.fullName || "Unknown User"}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Email</p>

                      <p className="font-semibold">{user?.email || "N/A"}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Account Phone</p>

                      <p className="font-semibold">
                        {user?.phoneNumber || "N/A"}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-3 round-lg">
                      <p className="text-xs text-gray-500">Delivery Phone</p>

                      <p className="font-semibold">
                        {selectedBooking.phoneNumber ||
                          selectedBooking.phone ||
                          selectedBooking.recipientPhone ||
                          "N/A"}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-3 round-lg">
                      <p className="text-xs text-gray-500">Status</p>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold
      ${
        selectedBooking.status === "pending"
          ? "bg-yellow-100 text-yellow-700"
          : selectedBooking.status === "completed"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
      }`}
                      >
                        {selectedBooking.status}
                      </span>
                    </div>

                    {/* under status field */}
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">Change Status</h3>

                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() =>
                            updateBookingStatus(
                              selectedBooking.collectionName,
                              selectedBooking.id,
                              "pending",
                            )
                          }
                          className="bg-yellow-500 text-white px-3 py-2 rounded"
                        >
                          Pending
                        </button>

                        <button
                          onClick={() =>
                            updateBookingStatus(
                              selectedBooking.collectionName,
                              selectedBooking.id,
                              "completed",
                            )
                          }
                          className="bg-green-500 text-white px-3 py-2 rounded"
                        >
                          Complete
                        </button>

                        <button
                          onClick={() =>
                            updateBookingStatus(
                              selectedBooking.collectionName,
                              selectedBooking.id,
                              "cancelled",
                            )
                          }
                          className="bg-red-500 text-white px-3 py-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Booked on</p>

                      <p className="font-semibold">
                        {selectedBooking.createdAt?.seconds
                          ? new Date(
                              selectedBooking.createdAt.seconds * 1000,
                            ).toLocaleString()
                          : "N/A"}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Date</p>

                      <p className="font-semibold">
                        {selectedBooking.date ||
                          selectedBooking.deliveryDate ||
                          selectedBooking.reminderDate ||
                          "N/A"}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Time</p>

                      <p className="font-semibold">
                        {formatTime(
                          selectedBooking.time ||
                            selectedBooking.deliveryTime ||
                            selectedBooking.callTime ||
                            selectedBooking.scheduledTime,
                        )}
                      </p>
                    </div>

                    {/* Companion Call Details */}

                    {selectedBooking.duration && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Call Duration</p>

                        <p className="font-semibold">
                          {selectedBooking.duration}
                        </p>
                      </div>
                    )}

                    {selectedBooking.conversationType && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">
                          Conversation Type
                        </p>

                        <p className="font-semibold">
                          {selectedBooking.conversationType}
                        </p>
                      </div>
                    )}

                    {selectedBooking.notes && (
                      <div className="bg-gray-50 p-3 rounded-lg md:col-span-2">
                        <p className="text-xs text-gray-500">
                          Additional Notes
                        </p>

                        <p className="font-semibold whitespace-pre-wrap">
                          {selectedBooking.notes}
                        </p>
                      </div>
                    )}

                    {/* added new */}
                    {selectedBooking.recipientName && (
                      <p>
                        <strong>Recipient:</strong>{" "}
                        {selectedBooking.recipientName}
                      </p>
                    )}

                    {selectedBooking.occasion && (
  <p>
    <strong>Occasion:</strong> {selectedBooking.occasion}
  </p>
)}

                    {selectedBooking.message && (
                      <p>
                        <strong>Message:</strong> {selectedBooking.message}
                      </p>
                    )}

                    {selectedBooking.relationship && (
                      <p>
                        <strong>Relationship:</strong>{" "}
                        {selectedBooking.relationship}
                      </p>
                    )}

                    {selectedBooking.purpose && (
                      <p>
                        <strong>Purpose:</strong> {selectedBooking.purpose}
                      </p>
                    )}

                    {/* at the bottom here */}
                    <div className="mt-6 border-t pt-4">
                      <button
                        onClick={() =>
                          deleteBooking(
                            selectedBooking.collectionName,
                            selectedBooking.id,
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Delete Booking
                      </button>
                    </div>
                    {/* ends here */}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default AdminDashboard;
