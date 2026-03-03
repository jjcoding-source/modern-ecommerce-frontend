import { Link } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQty } = useCart();

 const decreaseQty = (item) => {
  updateQty(item.id, item.qty - 1);
};

const increaseQty = (item) => {
  updateQty(item.id, item.qty + 1);
};

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // ---------------- Empty cart ----------------
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-semibold mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything yet.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-10">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ---------------- Cart items ---------------- */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 bg-white rounded-2xl shadow-sm border p-5 hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-xl"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">
                  {item.name}
                </h3>

                <p className="text-gray-500 text-sm mb-3">
                  ${item.price.toFixed(2)} each
                </p>

                <div className="flex items-center justify-between">

                  {/* Quantity */}
                  <div className="flex items-center gap-3 border rounded-full px-4 py-2">
                    <button
                      onClick={() => decreaseQty(item)}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <FaMinus />
                    </button>

                    <span className="min-w-[20px] text-center font-medium">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => increaseQty(item)}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  {/* Sub total */}
                  <div className="text-right">
                    <p className="font-semibold">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-2 flex items-center gap-2 text-sm text-red-500 hover:text-red-600"
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ---------------- Summary ---------------- */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 h-fit sticky top-24">

          <h2 className="text-xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Items</span>
              <span>
                {cartItems.reduce((a, b) => a + b.qty, 0)}
              </span>
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

          <div className="flex justify-between text-lg font-semibold mb-6">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link
            to="/checkout"
            className="block text-center bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Proceed to checkout
          </Link>

          <Link
            to="/"
            className="block text-center mt-4 text-sm text-gray-500 hover:text-blue-600"
          >
            Continue shopping
          </Link>

        </div>
      </div>
    </div>
  );
}