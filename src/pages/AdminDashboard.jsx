import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import RevenueChart from "../components/admin/RevenueChart";

import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaRupeeSign
} from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0
  });

  const [orders, setOrders] = useState([]);

  const loadStats = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const products =
      JSON.parse(localStorage.getItem("admin_products")) || [];
    const storedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    let revenue = 0;

    storedOrders.forEach((order) => {
      revenue += order.total || 0;
    });

    setOrders(storedOrders);

    setStats({
      users: users.length,
      products: products.length,
      orders: storedOrders.length,
      revenue
    });
  };

  useEffect(() => {
    loadStats();

    window.addEventListener("storage", loadStats);

    return () =>
      window.removeEventListener("storage", loadStats);
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r p-6 hidden md:block">

        <h2 className="text-2xl font-bold text-blue-600 mb-8">
          Admin Panel
        </h2>

        <nav className="space-y-3 text-sm">

          <Link
            to="/admin"
            className="block px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 font-medium"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className="block px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 font-medium"
          >
            Users
          </Link>

          <Link
            to="/admin/products"
            className="block px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 font-medium"
          >
            Products
          </Link>

          <Link
            to="/admin/orders"
            className="block px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 font-medium"
          >
            Orders
          </Link>

        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-sm text-gray-500">
            Admin Overview
          </p>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          <StatCard
            title="Total Users"
            value={stats.users}
            icon={<FaUsers />}
            color="bg-blue-100 text-blue-600"
          />

          <StatCard
            title="Total Products"
            value={stats.products}
            icon={<FaBoxOpen />}
            color="bg-green-100 text-green-600"
          />

          <StatCard
            title="Total Orders"
            value={stats.orders}
            icon={<FaShoppingCart />}
            color="bg-purple-100 text-purple-600"
          />

          <StatCard
            title="Revenue"
            value={`₹${stats.revenue}`}
            icon={<FaRupeeSign />}
            color="bg-yellow-100 text-yellow-600"
          />

        </div>

        {/* Revenue Chart */}
        <div className="mb-8">
          <RevenueChart orders={orders} />
        </div>

        {/* Sub pages render here */}
        <Outlet />

      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm text-gray-500 mb-1">
            {title}
          </p>

          <h3 className="text-3xl font-bold text-gray-800">
            {value}
          </h3>
        </div>

        <div
          className={`text-xl p-3 rounded-full ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}