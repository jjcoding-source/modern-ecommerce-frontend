import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders")) || [];
    // Ensure it's an array of objects
    if (Array.isArray(stored)) setOrders(stored);
  }, []);

  // Function to get badge color based on order status
  const getStatusColor = (status = "pending") => {
    switch (status.toLowerCase()) {
      case "delivered": return "bg-green-100 text-green-700";
      case "shipped": return "bg-yellow-100 text-yellow-700";
      case "pending": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-semibold mb-3">
          No orders yet
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t made any purchases yet.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => {
          const {
            id = "N/A",
            date = new Date().toISOString(),
            total = 0,
            paymentMethod = "N/A",
            status = "pending",
            items = [],
          } = order;

          return (
            <Link
              to={`/orders/${id}`}
              key={id}
              className="block bg-white rounded-2xl border shadow-sm hover:shadow-lg transition p-6 hover:-translate-y-1 duration-300"
            >
              {/* Header row */}
              <div className="flex flex-wrap justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium">#{id}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">
                    {new Date(date).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-semibold">₹{total.toFixed(2)}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Payment</p>
                  <p className="font-medium capitalize">{paymentMethod}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="border-t pt-4 space-y-2">
                {items.length === 0 ? (
                  <p className="text-gray-500 text-sm">No items in this order.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} × {item.qty}</span>
                      <span>₹{(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}