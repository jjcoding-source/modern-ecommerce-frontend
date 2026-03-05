import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const [order, setOrder] = useState(null);
  const [notAllowed, setNotAllowed] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const allOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const foundOrder = allOrders.find(
      (o) => String(o.id) === String(id)
    );

    if (!foundOrder) {
      setNotAllowed(true);
      return;
    }

    // 🔐 very important check
    if (foundOrder.user?.email !== currentUser.email) {
      setNotAllowed(true);
      return;
    }

    setOrder(foundOrder);
  }, [id, currentUser, navigate]);

  if (notAllowed) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-lg font-semibold">
          You are not allowed to view this order
        </p>
        <Link
          to="/orders"
          className="text-blue-600 hover:underline"
        >
          Go back to My Orders
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      <h1 className="text-2xl font-bold mb-6">
        Order Details
      </h1>

      <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">

        <div className="flex flex-wrap justify-between gap-4">
          <div>
            <p className="font-semibold">
              Order #{order.id}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(order.date).toLocaleString()}
            </p>
          </div>

          <span
            className={`text-xs px-3 py-1 rounded-full font-medium h-fit
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
        </div>

        <hr />

        <h2 className="font-semibold">Items</h2>

        <div className="space-y-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500">
                    Qty: {item.qty}
                  </p>
                </div>
              </div>

              <p className="font-medium">
                ₹{item.price * item.qty}
              </p>
            </div>
          ))}
        </div>

        <hr />

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{order.total}</span>
        </div>

        <hr />

        <div className="text-sm space-y-1">
          <p className="font-semibold">Shipping Address</p>
          <p>{order.address.fullName}</p>
          <p>{order.address.address}</p>
          <p>
            {order.address.city}, {order.address.state} -{" "}
            {order.address.pincode}
          </p>
          <p>Phone: {order.address.phone}</p>
        </div>

        <div className="text-sm">
          <p>
            <span className="font-semibold">
              Payment method:
            </span>{" "}
            {order.paymentMethod}
          </p>
        </div>

      </div>

      <div className="mt-6">
        <Link
          to="/orders"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to My Orders
        </Link>
      </div>

    </div>
  );
}