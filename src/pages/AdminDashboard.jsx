import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function AdminDashboard() {

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {

    const loadStats = () => {

      // -------- Users --------
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // -------- Products --------
      const products =
        JSON.parse(localStorage.getItem("admin_products")) || [];

      // -------- Orders (all users) --------
      let totalOrders = 0;
      let totalRevenue = 0;
      let allOrders = [];

      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("orders_")) {

          const userOrders =
            JSON.parse(localStorage.getItem(key)) || [];

          totalOrders += userOrders.length;

          userOrders.forEach((order) => {
            if (order?.total) {
              totalRevenue += Number(order.total);
            }
          });

          allOrders.push(...userOrders);
        }
      });

      // newest first
      allOrders.sort(
        (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
      );

      setRecentOrders(allOrders.slice(0, 5));

      setStats({
        users: users.length,
        products: products.length,
        orders: totalOrders,
        revenue: totalRevenue
      });
    };

    loadStats();

    window.addEventListener("storage", loadStats);

    return () => window.removeEventListener("storage", loadStats);

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

          <StatCard title="Total Users" value={stats.users} />
          <StatCard title="Total Products" value={stats.products} />
          <StatCard title="Total Orders" value={stats.orders} />
          <StatCard title="Revenue" value={`₹${stats.revenue}`} />

        </div>

        {/*  Recent orders table */}
        <div className="bg-white rounded-2xl shadow-sm border mb-10">

          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">
              Recent Orders
            </h3>

            <Link
              to="/admin/orders"
              className="text-sm text-blue-600 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Order</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Items</th>
                  <th className="px-4 py-3 text-left">Total</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium">
                      #{order.id}
                    </td>

                    <td className="px-4 py-3">
                      {order.user?.name || "Guest"}
                    </td>

                    <td className="px-4 py-3">
                      {order.items?.length || 0}
                    </td>

                    <td className="px-4 py-3 font-semibold">
                      ₹{order.total}
                    </td>

                    <td className="px-4 py-3 capitalize">
                      <span className="px-2 py-1 rounded-full text-xs bg-gray-100">
                        {order.status || "pending"}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      {order.date
                        ? new Date(order.date).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))}

                {recentOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-8 text-gray-500"
                    >
                      No recent orders
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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