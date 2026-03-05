import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaCreditCard, FaMoneyBillWave, FaUniversity } from "react-icons/fa";
import { useUser } from "../context/UserContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { currentUser } = useUser();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  for (const key in form) {
    if (!form[key]) {
      alert("Please fill all address fields");
      return;
    }
  }

 const order = {
  id: Date.now(),

  user: currentUser
    ? {
        name: currentUser.name,
        email: currentUser.email,
      }
    : {
        name: form.fullName,
        email: form.email,
      },

  items: cartItems,
  total,
  address: form,
  paymentMethod,
  status: "pending",
  date: new Date().toISOString(),
};

  const existingOrders =
    JSON.parse(localStorage.getItem("orders")) || [];

  localStorage.setItem(
    "orders",
    JSON.stringify([order, ...existingOrders])
  );
  
  clearCart();
  navigate("/order-success");
};

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">
          Your cart is empty
        </h2>
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-blue-600 text-white"
        >
          Go shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-semibold mb-10">
        Checkout
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-10"
      >

        {/* ---------------- Left ---------------- */}
        <div className="lg:col-span-2 space-y-10">

          {/* Address */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">
              Shipping Address
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                name="fullName"
                placeholder="Full name"
                value={form.fullName}
                onChange={handleChange}
                className="input"
              />

              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="input"
              />

              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="input"
              />

              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="input"
              />

              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                className="input"
              />

              <input
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleChange}
                className="input"
              />

              <textarea
                name="address"
                placeholder="Full address"
                value={form.address}
                onChange={handleChange}
                rows="3"
                className="input md:col-span-2 resize-none"
              />
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">
              Payment Method
            </h2>

            <div className="space-y-4">

              <label
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition
                ${paymentMethod === "card" ? "border-blue-600 bg-blue-50" : ""}`}
              >
                <input
                  type="radio"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <FaCreditCard className="text-xl" />
                Credit / Debit Card (mock)
              </label>

              <label
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition
                ${paymentMethod === "upi" ? "border-blue-600 bg-blue-50" : ""}`}
              >
                <input
                  type="radio"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />
                <FaUniversity className="text-xl" />
                UPI / Net Banking (mock)
              </label>

              <label
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition
                ${paymentMethod === "cod" ? "border-blue-600 bg-blue-50" : ""}`}
              >
                <input
                  type="radio"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <FaMoneyBillWave className="text-xl" />
                Cash on Delivery
              </label>

            </div>

            {/* Mock card fields */}
            {paymentMethod === "card" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <input
                  placeholder="Card number"
                  className="input md:col-span-2"
                />
                <input
                  placeholder="Name on card"
                  className="input md:col-span-2"
                />
                <input
                  placeholder="MM/YY"
                  className="input"
                />
                <input
                  placeholder="CVV"
                  className="input"
                />
              </div>
            )}
          </div>
        </div>

        {/* ---------------- Right summary ---------------- */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm h-fit sticky top-24">

          <h3 className="text-xl font-semibold mb-6">
            Order Summary
          </h3>

          <div className="space-y-4 text-sm">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-3"
              >
                <span className="line-clamp-1">
                  {item.name} × {item.qty}
                </span>
                <span>
                  ₹{(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="border-t pt-4 flex justify-between font-medium">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Place order
          </button>

        </div>
      </form>
    </div>
  );
}