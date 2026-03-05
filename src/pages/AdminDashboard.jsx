import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0
  });

  useEffect(() => {
    // -------- Users --------
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // -------- Products --------
    const products =
      JSON.parse(localStorage.getItem("admin_products")) || [];

    // -------- Orders (all users) --------
    let totalOrders = 0;
    let totalRevenue = 0;

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("orders_")) {
        const userOrders = JSON.parse(localStorage.getItem(key)) || [];

        totalOrders += userOrders.length;

        userOrders.forEach((order) => {
          if (order.total) {
            totalRevenue += order.total;
          }
        });
      }
    });

    setStats({
      users: users.length,
      products: products.length,
      orders: totalOrders,
      revenue: totalRevenue
    });
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 hidden md:block">
        <h2 className="text-xl font-bold text-blue-600 mb-6">
          Admin Panel
        </h2>

        <nav className="space-y-3 text-sm">
          <Link
            to="/admin"
            className="block text-gray-700 hover:text-blue-600 font-medium"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className="block text-gray-700 hover:text-blue-600 font-medium"
          >
            Users
          </Link>

          <Link
            to="/admin/products"
            className="block text-gray-700 hover:text-blue-600 font-medium"
          >
            Products
          </Link>

          <Link
            to="/admin/orders"
            className="block text-gray-700 hover:text-blue-600 font-medium"
          >
            Orders
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">

        {/* Top stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          <StatCard
            title="Total Users"
            value={stats.users}
          />

          <StatCard
            title="Total Products"
            value={stats.products}
          />

          <StatCard
            title="Total Orders"
            value={stats.orders}
          />

          <StatCard
            title="Revenue"
            value={`₹${stats.revenue}`}
          />

        </div>

        <Outlet />
      </main>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
    </div>
  );
}