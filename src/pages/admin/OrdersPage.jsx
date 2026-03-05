import { useEffect, useState } from "react";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(stored);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );

    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        Orders Management
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow border">

        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Items</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const status = order.status || "pending";

              return (
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
                    {order.user?.email || "-"}
                  </td>

                  <td className="px-4 py-3">
                    {order.items?.length || 0}
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    ₹{order.total}
                  </td>

                  <td className="px-4 py-3">
                    {order.date
                      ? new Date(order.date).toLocaleString()
                      : "-"}
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={status}
                      onChange={(e) =>
                        updateStatus(order.id, e.target.value)
                      }
                      className={`px-2 py-1 rounded text-xs font-medium border outline-none ${statusStyles[status]}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              );
            })}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-10 text-gray-500"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}