import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const allOrders = [];

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("orders_")) {
        const email = key.replace("orders_", "");
        const userOrders = JSON.parse(localStorage.getItem(key)) || [];

        userOrders.forEach((order) => {
          allOrders.push({
            ...order,
            userEmail: email
          });
        });
      }
    });

    allOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

    setOrders(allOrders);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h2 className="text-xl font-bold mb-4">All Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">Items</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id || index}
                className="hover:bg-gray-50"
              >
                <td className="px-4 py-2 border font-medium">
                  {order.id || `ORD-${index + 1}`}
                </td>

                <td className="px-4 py-2 border">
                  {order.userEmail}
                </td>

                <td className="px-4 py-2 border">
                  {order.items?.length || 0}
                </td>

                <td className="px-4 py-2 border">
                  ₹{order.total || 0}
                </td>

                <td className="px-4 py-2 border">
                  {order.date
                    ? new Date(order.date).toLocaleString()
                    : "-"}
                </td>

                <td className="px-4 py-2 border">
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                    {order.status || "Placed"}
                  </span>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}