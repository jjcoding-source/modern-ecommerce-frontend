import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto mt-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-6">Save your favorite products here to buy later!</p>
        <img src="/empty-heart.svg" alt="Empty wishlist" className="mx-auto w-32 h-32 opacity-50 mb-6" />
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
          >
            <Link to={`/product/${item.id}`}>
              <div className="relative h-48 overflow-hidden bg-gray-50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                  20% OFF
                </span>
              </div>
            </Link>

            <div className="flex flex-col flex-1 px-4 pb-4">
              <Link
                to={`/product/${item.id}`}
                className="mt-3 text-sm font-semibold text-gray-800 line-clamp-2 min-h-[40px] hover:text-blue-600 transition"
              >
                {item.name}
              </Link>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                <span className="text-sm text-gray-400 line-through">
                  ₹{Math.round(item.price * 1.25)}
                </span>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => addToCart(item)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 active:scale-95 transition"
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="flex items-center justify-center gap-2 bg-gray-100 text-red-500 py-2 rounded-xl font-medium hover:bg-gray-200 transition"
                >
                  <FaTrash />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}