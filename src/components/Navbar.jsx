import { useState, useEffect } from "react";
import { FaShoppingCart, FaUser, FaHeart, FaBell, FaSearch, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import productsData from "../data/products"; 

export default function Navbar({ setFilteredProducts }) {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);
  const subtotal = cartItems.reduce((total, item) => total + item.qty * item.price, 0);
  const discount = Math.floor(subtotal * 0.05);
  const total = subtotal - discount;

  // Live product filter
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(productsData);
      setSuggestions([]);
      return;
    }

    const filtered = productsData.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
    setSuggestions(filtered.slice(0,5));
  }, [searchTerm, setFilteredProducts]);

  const handleSelectSuggestion = (product) => {
    setSearchTerm(product.name);
    setSuggestions([]);
    setFilteredProducts([product]);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
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

            {/* Search */}
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
              {suggestions.length > 0 && (
                <ul className="absolute top-12 left-0 w-full bg-white shadow-xl rounded-lg overflow-hidden z-50">
                  {suggestions.map((product) => (
                    <li
                      key={product.id}
                      onClick={() => handleSelectSuggestion(product)}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100 transition"
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">

              {/* Cart Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCartOpen(true)}
                onMouseLeave={() => setCartOpen(false)}
              >
                <FaShoppingCart className="text-lg text-gray-700 hover:text-blue-600 cursor-pointer transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[11px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {cartCount}
                  </span>
                )}

                <div
                  className={`absolute right-0 mt-2 w-96 bg-white border border-gray-200 shadow-2xl rounded-2xl z-50 p-5 transition-all duration-300 ease-in-out transform ${
                    cartOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800 text-lg">Your Cart</h3>
                    {cartItems.length > 0 && (
                      <button
                        onClick={clearCart}
                        className="text-red-500 text-sm hover:underline font-medium"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {cartItems.length > 0 ? (
                    <>
                      <div className="max-h-72 overflow-y-auto divide-y divide-gray-200 mb-4">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-xl transition p-2">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-14 h-14 object-cover rounded-md hover:scale-105 transition-transform"
                              />
                              <div>
                                <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                                <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-900">₹{item.price * item.qty}</span>
                              <FaTrash
                                className="text-red-500 cursor-pointer hover:text-red-700 transition"
                                onClick={() => removeFromCart(item.id)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Subtotal & Total */}
                      <div className="border-t border-gray-200 pt-3 pb-4 mb-3 text-gray-800">
                        <div className="flex justify-between font-medium text-sm mb-1">
                          <span>Subtotal:</span>
                          <span>₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 text-sm mb-1">
                          <span>Discount:</span>
                          <span>-₹{discount}</span>
                        </div>
                        <div className="flex justify-between font-bold text-base">
                          <span>Total:</span>
                          <span>₹{total}</span>
                        </div>
                      </div>

                      <Link
                        to="/checkout"
                        className="block w-full text-center bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition"
                      >
                        Checkout
                      </Link>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10">
                      <p className="text-gray-500 text-sm mb-2">Your cart is empty.</p>
                      <img src="/empty-cart.svg" alt="Empty cart" className="w-24 h-24 opacity-50" />
                    </div>
                  )}
                </div>
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