import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: ""
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) return;

    
    clearCart();
    navigate("/order-success");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

      <form
        onSubmit={placeOrder}
        className="grid grid-cols-1 lg:grid-cols-3 gap-10"
      >
        {/* ---------------- Address ---------------- */}
        <div className="lg:col-span-2 bg-white border rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Shipping details</h2>

          <input
            name="fullName"
            placeholder="Full name"
            className="w-full border rounded-lg px-4 py-2"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2"
            onChange={handleChange}
            required
          />

          <input
            name="address"
            placeholder="Address"
            className="w-full border rounded-lg px-4 py-2"
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="city"
              placeholder="City"
              className="border rounded-lg px-4 py-2"
              onChange={handleChange}
              required
            />

            <input
              name="zip"
              placeholder="ZIP code"
              className="border rounded-lg px-4 py-2"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* ---------------- Summary ---------------- */}
        <div className="bg-white border rounded-2xl p-6 h-fit space-y-4">
          <h2 className="text-xl font-semibold">Order summary</h2>

          <div className="space-y-2 text-sm text-gray-600">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Place order
          </button>

          <Link
            to="/cart"
            className="block text-center text-sm text-gray-500 hover:text-blue-600"
          >
            Back to cart
          </Link>
        </div>
      </form>
    </div>
  );
}