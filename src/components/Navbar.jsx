import { useState } from "react";
import { FaShoppingCart, FaUser, FaHeart, FaBell } from "react-icons/fa";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(2);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {}
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">Shopify</h1>
          <ul className="hidden md:flex space-x-6">
            <li className="hover:text-blue-500 cursor-pointer">Home</li>
            <li className="hover:text-blue-500 cursor-pointer">Shop</li>
            <li className="hover:text-blue-500 cursor-pointer">Categories</li>
            <li className="hover:text-blue-500 cursor-pointer">Deals</li>
          </ul>
        </div>

        {}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search products..."
            className="border rounded-md px-3 py-1 focus:outline-blue-500 hidden md:block"
          />
          <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 hidden md:block">
            Search
          </button>

          <div className="flex items-center space-x-3">
            <button className="relative">
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button>
              <FaHeart className="text-xl hover:text-blue-600" />
            </button>

            <button>
              <FaBell className="text-xl hover:text-blue-600" />
            </button>

            <button className="flex items-center space-x-1 hover:text-blue-600">
              <FaUser /> <span>Login</span>
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}