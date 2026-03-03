import { useState, useEffect } from "react";
import { FaShoppingCart, FaUser, FaHeart, FaBell, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import productsData from "../data/products"; 

export default function Navbar({ setFilteredProducts }) {
  const { cartItems } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showCartPreview, setShowCartPreview] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);
  const subtotal = cartItems.reduce((total, item) => total + item.qty * item.price, 0);

 
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(productsData);
      setSuggestions([]);
      return;
    }

    const filtered = productsData.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);          
    setSuggestions(filtered.slice(0, 5));   
  }, [searchTerm, setFilteredProducts]);

  const handleSelectSuggestion = (product) => {
    setSearchTerm(product.name);
    setSuggestions([]);
    setFilteredProducts([product]); 
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">

          {/* Left */}
          <div className="flex items-center gap-10">
            <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight cursor-pointer">
              Shoply
            </Link>

            <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600">
              <li><Link to="/" className="hover:text-blue-600 transition">Home</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition">Shop</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition">Categories</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition">Deals</Link></li>
            </ul>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5 relative">

            <li className="hover:text-blue-600 cursor-pointer">
              <Link to="/orders">My Orders</Link>
            </li>

            {/* Search input */}
            <div className="hidden md:flex flex-col w-64 relative">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full focus-within:ring-2 focus-within:ring-blue-500 transition">
                <input
                  type="text"
                  placeholder="Search products…"
                  className="bg-transparent outline-none text-sm w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="text-gray-500 ml-2" />
              </div>

              {/* Suggestions dropdown */}
              {suggestions.length > 0 && (
                <ul className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg overflow-hidden z-50">
                  {suggestions.map((product) => (
                    <li
                      key={product.id}
                      onClick={() => handleSelectSuggestion(product)}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">

              {/* Cart with preview */}
              <div
                className="relative"
                onMouseEnter={() => setShowCartPreview(true)}
                onMouseLeave={() => setShowCartPreview(false)}
              >
                <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition" aria-label="Cart">
                  <FaShoppingCart className="text-lg" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[11px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Cart preview dropdown */}
                {showCartPreview && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-50">
                    {cartItems.length > 0 ? (
                      <>
                        <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
                          {cartItems.map((item) => (
                            <li key={item.id} className="flex justify-between items-center px-4 py-2">
                              <span className="text-sm">{item.name} x {item.qty}</span>
                              <span className="text-sm font-semibold">₹{item.price * item.qty}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="px-4 py-2 border-t border-gray-200 flex justify-between items-center font-semibold">
                          <span>Subtotal:</span>
                          <span>₹{subtotal}</span>
                        </div>
                        <div className="px-4 py-2 border-t border-gray-200">
                          <Link
                            to="/cart"
                            className="block text-center bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition"
                          >
                            View Cart
                          </Link>
                        </div>
                      </>
                    ) : (
                      <p className="p-4 text-center text-gray-500">Your cart is empty.</p>
                    )}
                  </div>
                )}
              </div>

              <button className="hidden sm:block text-gray-700 hover:text-blue-600 transition">
                <FaHeart className="text-lg" />
              </button>

              <button className="hidden sm:block text-gray-700 hover:text-blue-600 transition">
                <FaBell className="text-lg" />
              </button>

              <Link to="/login" className="hidden md:flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
                <FaUser />
                <span className="text-sm font-medium">Login</span>
              </Link>

              <Link to="/register" className="ml-1 rounded-full bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition">
                Register
              </Link>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}