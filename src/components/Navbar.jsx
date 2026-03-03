import { FaShoppingCart, FaUser, FaHeart, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">

          {/* Left */}
          <div className="flex items-center gap-10">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 tracking-tight cursor-pointer"
            >
              Shoply
            </Link>

            <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-600 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="hover:text-blue-600 transition"
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="hover:text-blue-600 transition"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="hover:text-blue-600 transition"
                >
                  Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5">

            {/* Search */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <input
                type="text"
                placeholder="Search products…"
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">

              {/* Cart */}
              <Link
                to="/cart"
                className="relative text-gray-700 hover:text-blue-600 transition"
                aria-label="Cart"
              >
                <FaShoppingCart className="text-lg" />

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[11px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Wishlist */}
              <button className="hidden sm:block text-gray-700 hover:text-blue-600 transition">
                <FaHeart className="text-lg" />
              </button>

              {/* Notifications */}
              <button className="hidden sm:block text-gray-700 hover:text-blue-600 transition">
                <FaBell className="text-lg" />
              </button>

              {/* User */}
            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
            >
              <FaUser />
              <span className="text-sm font-medium">Login</span>
            </Link>

              {/* Register */}
              <Link
                to="/register"
                className="ml-1 rounded-full bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition"
              >
               Register
            </Link>

            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}