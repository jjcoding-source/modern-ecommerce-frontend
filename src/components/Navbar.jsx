import { useState } from "react";
import { FaShoppingCart, FaUser, FaHeart, FaBell, FaMoon, FaSun } from "react-icons/fa";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(2);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo & Links */}
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer">Shopify</h1>
          <ul className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-200">
            <li className="hover:text-blue-500 cursor-pointer">Home</li>
            <li className="hover:text-blue-500 cursor-pointer">Shop</li>
            <li className="hover:text-blue-500 cursor-pointer">Categories</li>
            <li className="hover:text-blue-500 cursor-pointer">Deals</li>
          </ul>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search products..."
            className="border rounded-md px-3 py-1 focus:outline-blue-500 hidden md:block dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 hidden md:block">
            Search
          </button>

          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="text-gray-700 dark:text-gray-200 text-xl hover:text-blue-500"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <button className="relative text-gray-700 dark:text-gray-200">
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="text-gray-700 dark:text-gray-200">
              <FaHeart className="hover:text-blue-600" />
            </button>

            <button className="text-gray-700 dark:text-gray-200">
              <FaBell className="hover:text-blue-600" />
            </button>

            <button className="flex items-center space-x-1 hover:text-blue-600 dark:text-gray-200">
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