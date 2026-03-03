import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const found = orders.find((o) => String(o.id) === id);
    setOrder(found);
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">
          Order not found
        </h2>
        <Link
          to="/orders"
          className="text-blue-600 hover:underline"
        >
          Back to orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">
          Order Details
        </h1>

        <Link
          to="/orders"
          className="text-sm text-blue-600 hover:underline"
        >
          Back to orders
        </Link>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white border rounded-xl p-5">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-medium">#{order.id}</p>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <p className="text-sm text-gray-500">Date</p>
          <p className="font-medium">
            {new Date(order.date).toLocaleString()}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <p className="text-sm text-gray-500">Payment</p>
          <p className="font-medium capitalize">
            {order.paymentMethod}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <p className="text-sm text-gray-500">Total</p>
          <p className="font-semibold">
            ₹{order.total.toFixed(2)}
          </p>
        </div>

      </div>

      {/* Items */}
      <div className="bg-white border rounded-2xl p-6 mb-8">

        <h2 className="text-xl font-semibold mb-4">
          Items
        </h2>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain border rounded-lg"
                />

                <div>
                  <p className="font-medium">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.qty}
                  </p>
                </div>
              </div>

              <p className="font-medium">
                ₹{(item.price * item.qty).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Address */}
      <div className="bg-white border rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          Delivery address
        </h2>

        <div className="text-sm text-gray-700 space-y-1">
          <p>{order.address.fullName}</p>
          <p>{order.address.street}</p>
          <p>
            {order.address.city}, {order.address.state}
          </p>
          <p>{order.address.zip}</p>
          <p>{order.address.phone}</p>
        </div>

      </div>
    </div>
  );
}