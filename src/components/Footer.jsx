import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white mt-16">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h1 className="text-2xl font-bold mb-4">Shopify</h1>
          <p className="text-gray-200">
            Your one-stop shop for all your needs. Quality products, fast delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2 hover:text-gray-300 cursor-pointer">Home</li>
            <li className="mb-2 hover:text-gray-300 cursor-pointer">Shop</li>
            <li className="mb-2 hover:text-gray-300 cursor-pointer">Categories</li>
            <li className="mb-2 hover:text-gray-300 cursor-pointer">Deals</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul>
            <li className="mb-2 hover:text-gray-300 cursor-pointer">FAQ</li>
            <li className="mb-2 hover:text-gray-300 cursor-pointer">Contact Us</li>
            <li className="mb-2 hover:text-gray-300 cursor-pointer">Shipping</li>
            <li className="mb-2 hover:text-gray-300 cursor-pointer">Returns</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-4">Newsletter</h3>
          <p className="text-gray-200 mb-4">Subscribe for the latest deals and updates</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-l-md px-3 py-2 text-black w-full"
            />
            <button className="bg-white text-blue-600 px-4 py-2 rounded-r-md font-semibold hover:bg-gray-200">
              Subscribe
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center mt-6 space-x-4">
            <FaFacebookF className="hover:text-gray-200 cursor-pointer" />
            <FaTwitter className="hover:text-gray-200 cursor-pointer" />
            <FaInstagram className="hover:text-gray-200 cursor-pointer" />
            <FaLinkedinIn className="hover:text-gray-200 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="bg-blue-700 text-center text-gray-200 py-4 mt-6">
        © 2026 Shopify. All rights reserved.
      </div>
    </footer>
  );
}