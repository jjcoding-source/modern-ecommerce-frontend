import { FaTrash, FaMinus, FaPlus, FaShoppingBag } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <FaShoppingBag className="mx-auto text-6xl text-gray-300 mb-6" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500">
          Looks like you haven’t added anything yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Shopping Cart
        </h2>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
          >
            {/* Image */}
            <div className="w-28 h-28 bg-gray-50 rounded-xl flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain p-2"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">
                {item.name}
              </h3>

              <p className="text-blue-600 font-bold mt-1">
                ₹{item.price}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  <FaMinus />
                </button>

                <span className="w-8 text-center font-medium">
                  {item.qty}
                </span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-600 self-start sm:self-center"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Order Summary
        </h3>

        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">FREE</span>
          </div>

          <div className="border-t pt-3 flex justify-between font-semibold text-gray-800">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>
        </div>

        <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}