import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function MyOrders() {
  const { currentUser } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      setOrders([]);
      return;
    }

    const allOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const userOrders = allOrders.filter(
      (order) => order.user?.email === currentUser.email
    );

    setOrders(userOrders);
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Please login to view your orders
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders yet.</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-5 bg-white shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <p className="font-semibold">
                Order #{order.id}
              </p>

              <p className="text-sm text-gray-500">
                {new Date(order.date).toLocaleString()}
              </p>

              <p className="text-sm mt-1">
                Items: {order.items.length}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <span className="font-semibold">
                ₹{order.total}
              </span>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium
                ${
                  order.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status || "pending"}
              </span>

              <Link
                to={`/orders/${order.id}`}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}