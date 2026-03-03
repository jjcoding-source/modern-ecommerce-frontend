import { useState } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaHeart,
  FaBell,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const cartCount = 2;

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">

        {/* Main bar */}
        <div className="h-16 flex items-center justify-between gap-6">

          {/* Left */}
          <div className="flex items-center gap-6 shrink-0">
            <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
              ShopNext
            </h1>

            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
              <span className="hover:text-blue-600 cursor-pointer">Home</span>
              <span className="hover:text-blue-600 cursor-pointer">Shop</span>
              <span className="hover:text-blue-600 cursor-pointer">Categories</span>
              <span className="hover:text-blue-600 cursor-pointer">Deals</span>
            </nav>
          </div>

          {/* Center search */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="w-full flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5 shrink-0">

            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <FaHeart className="text-lg text-gray-600" />
            </button>

            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <FaBell className="text-lg text-gray-600" />
            </button>

            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <FaShoppingCart className="text-lg text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="hidden md:flex items-center gap-3">
              <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600">
                <FaUser />
                Login
              </button>

              <button className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-blue-700 transition">
                Register
              </button>
            </div>

            {/* mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 flex flex-col gap-4 text-sm font-medium text-gray-700">

            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>

            <span className="hover:text-blue-600 cursor-pointer">Home</span>
            <span className="hover:text-blue-600 cursor-pointer">Shop</span>
            <span className="hover:text-blue-600 cursor-pointer">Categories</span>
            <span className="hover:text-blue-600 cursor-pointer">Deals</span>

            <div className="pt-3 border-t flex gap-4">
              <button className="flex items-center gap-2 text-sm">
                <FaUser /> Login
              </button>

              <button className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}