import { FaShoppingCart, FaUser, FaHeart, FaBell } from "react-icons/fa";
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
            <h1 className="text-2xl font-bold text-blue-600 tracking-tight cursor-pointer">
              Shoply
            </h1>

            <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600">
              <li className="hover:text-blue-600 cursor-pointer">Home</li>
              <li className="hover:text-blue-600 cursor-pointer">Shop</li>
              <li className="hover:text-blue-600 cursor-pointer">Categories</li>
              <li className="hover:text-blue-600 cursor-pointer">Deals</li>
            </ul>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5">

            {/* Search */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64">
              <input
                type="text"
                placeholder="Search products…"
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">

              <button className="relative text-gray-700 hover:text-blue-600 transition">
                <FaShoppingCart className="text-lg" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[11px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {cartCount}
                  </span>
                )}
              </button>

              <button className="hidden sm:block text-gray-700 hover:text-blue-600 transition">
                <FaHeart className="text-lg" />
              </button>

              <button className="hidden sm:block text-gray-700 hover:text-blue-600 transition">
                <FaBell className="text-lg" />
              </button>

              <div className="hidden md:flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer transition">
                <FaUser />
                <span className="text-sm font-medium">Login</span>
              </div>

              <button className="ml-1 rounded-full bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition">
                Register
              </button>

            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}