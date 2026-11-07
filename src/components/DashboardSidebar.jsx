import { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUserFriends,
  FaBirthdayCake,
  FaBell,
  FaHistory,
  FaUser,
} from "react-icons/fa";

function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      name: "Companion Call",
      icon: <FaUserFriends />,
      path: "/dashboard/companion-call",
    },
    {
      name: "Shout-Out Call",
      icon: <FaBirthdayCake />,
      path: "/dashboard/shoutout-call",
    },
    {
      name: "Reminder Call",
      icon: <FaBell />,
      path: "/dashboard/reminder-call",
    },
    {
      name: "History",
      icon: <FaHistory />,
      path: "/dashboard/history",
    },
    {
      name: "Profile",
      icon: <FaUser />,
      path: "/dashboard/profile",
    },
  ];

  return (

  <>
    {/* Mobile Header */}
    <div className="md:hidden sticky top-0 z-50 bg-white border-b px-4 p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-500">
          Paddy<span className="text-blue-800">/</span>Bot
        </Link>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-2xl text-gray-700"
      >
        ☰
      </button>
    </div>

    {/* Mobile Menu */}
    {isOpen && (
      <div className="md:hidden bg-white shadow-lg p-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className="block py-3 border-b"
          >
            {item.name}
          </Link>
        ))}
      </div>
    )}

    {/* Desktop Sidebar */}
    <aside className="hidden md:block fixed left-0 top-0 w-72 bg-white shadow-lg h-screen">
      <div className="p-6 border-b">
        <Link to="/" className="text-2xl font-bold text-red-500">
          Paddy<span className="text-blue-800">/</span>Bot
        </Link>
      </div>

      <nav className="p-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-4 rounded-xl mb-2 transition-all duration-300
              ${
                location.pathname === item.path
                  ? "bg-red-500 text-white"
                  : "hover:bg-red-100"
              }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  </>
);
  
}

export default DashboardSidebar;