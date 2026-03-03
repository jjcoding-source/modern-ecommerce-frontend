import { useState } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaHeart,
  FaBell,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartCount] = useState(3);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-5">
        <div className="h-16 flex items-center justify-between gap-6">

          {/* LEFT ------------------------------------------------ */}
          <div className="flex items-center gap-8 shrink-0">
            <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
              Shopify
            </h1>

            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
              <span className="hover:text-blue-600 cursor-pointer">Home</span>
              <span className="hover:text-blue-600 cursor-pointer">Shop</span>
              <span className="hover:text-blue-600 cursor-pointer">
                Categories
              </span>
              <span className="hover:text-blue-600 cursor-pointer">Deals</span>
            </nav>
          </div>

          {/* CENTER (Search – always centered and wide) -------- */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="w-full max-w-xl flex">
              <input
                className="w-full border border-gray-300 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search products, brands and more..."
              />
              <button className="bg-blue-600 text-white px-5 rounded-r-lg hover:bg-blue-700 transition">
                Search
              </button>
            </div>
          </div>

          {/* RIGHT ---------------------------------------------- */}
          <div className="hidden md:flex items-center gap-5 shrink-0">

            <button className="relative text-gray-700 hover:text-blue-600 transition">
              <FaShoppingCart className="text-lg" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="text-gray-700 hover:text-blue-600 transition">
              <FaHeart className="text-lg" />
            </button>

            <button className="text-gray-700 hover:text-blue-600 transition">
              <FaBell className="text-lg" />
            </button>

            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition">
              <FaUser />
              <span>Account</span>
            </div>

            <button className="ml-2 bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Sign up
            </button>
          </div>

          {/* MOBILE MENU BUTTON -------------------------------- */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-xl text-gray-700"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MOBILE PANEL ----------------------------------------- */}
      {open && (
        <div className="md:hidden border-t bg-white px-5 py-4 space-y-4">
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="Search products..."
          />

          <nav className="flex flex-col gap-3 text-sm font-medium text-gray-700">
            <span>Home</span>
            <span>Shop</span>
            <span>Categories</span>
            <span>Deals</span>
          </nav>
        </div>
      )}
    </header>
  );
}