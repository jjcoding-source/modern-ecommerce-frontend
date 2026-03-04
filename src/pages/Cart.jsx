import { Link } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, incrementQty, decrementQty } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-bold mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything yet.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-blue-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-10">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ---------------- Cart Items ---------------- */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-6 bg-white rounded-2xl shadow-md border hover:shadow-xl transition p-5 hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-xl hover:scale-105 transition-transform"
              />

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-gray-800 hover:text-blue-600 transition">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Quantity */}
                  <div className="flex items-center gap-3 border rounded-full px-4 py-2 bg-gray-50 shadow-sm">
                    <button
                      onClick={() => decrementQty(item.id)}
                      className="text-gray-600 hover:text-blue-600 transition"
                    >
                      <FaMinus />
                    </button>

                    <span className="min-w-[24px] text-center font-medium">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => incrementQty(item.id)}
                      className="text-gray-600 hover:text-blue-600 transition"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  {/* Subtotal & Remove */}
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 text-lg">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-2 flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition"
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ---------------- Order Summary ---------------- */}
        <div className="bg-white rounded-2xl border shadow-md p-6 h-fit sticky top-24">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Order Summary</h2>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{cartItems.reduce((a, b) => a + b.qty, 0)}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
          </div>

          <div className="border-t my-5" />

          <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link
            to="/checkout"
            className="block text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-full font-semibold shadow-lg hover:from-blue-600 hover:to-blue-800 transition"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/"
            className="block text-center mt-4 text-sm text-gray-500 hover:text-blue-600 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}