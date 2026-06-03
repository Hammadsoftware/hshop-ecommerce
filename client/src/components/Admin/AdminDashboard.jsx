import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import Dashboard from "./Dashboard";
import User from "./User";
import Order from "./Orders";
import Product from "./Product";
import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/userSlice";
import { toast } from "react-toastify";
import axios from "axios";

const navItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, component: <Dashboard /> },
  { label: "Users", icon: <FaUsers />, component: <User /> },
  { label: "Products", icon: <FaBoxOpen />, component: <Product /> },
  { label: "Orders", icon: <FaShoppingCart />, component: <Order /> },
];

function AdminDashboard() {
  const [selected, setSelected] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/user/logout", {
        withCredentials: true,
      });
      dispatch(setLogout());
      toast.success("Logged out successfully!");
      window.location.href = "/";
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  return (
    <div className="min-h-screen  flex flex-col md:flex-row">
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow z-10">
        <div className="text-xl font-bold">Admin Panel</div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars className="text-xl" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg fixed md:static top-0 left-0 h-full w-64 z-20 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-6 text-2xl font-bold border-b hidden md:block">
          Admin Panel
        </div>
        <nav className="flex flex-col h-full">
          <ul className="flex-1 overflow-y-auto">
            {navItems.map((item, idx) => (
              <li key={item.label}>
                <button
                  className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-gray-100 transition ${
                    selected === idx ? "bg-gray-200 font-semibold" : ""
                  }`}
                  onClick={() => {
                    setSelected(idx);
                    setSidebarOpen(false); // close on mobile
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <button
                className="w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-red-100 text-red-600 font-semibold transition"
                onClick={handleLogout}
              >
                <span className="text-lg">
                  <FaSignOutAlt />
                </span>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 mt-16 md:mt-0">{navItems[selected].component}</main>
    </div>
  );
}

export default AdminDashboard;
