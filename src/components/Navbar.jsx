import { useState, useEffect } from "react";
import { FaShoppingCart, FaUser, FaHeart, FaBell, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import productsData from "../data/products"; 

export default function Navbar({ setFilteredProducts }) {
  const { cartItems } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);

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
              <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition" aria-label="Cart">
                <FaShoppingCart className="text-lg" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[11px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {cartCount}
                  </span>
                )}
              </Link>

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