import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { name, price, rating, image } = product;

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">

      {/* Image */}
      <div className="relative h-[190px] overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />

        <span className="absolute top-3 left-3 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
          20% OFF
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-4 pb-4">

        <h3 className="mt-3 text-sm font-semibold text-gray-800 line-clamp-2 min-h-[40px]">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400 text-sm mt-1">
          {[...Array(fullStars)].map((_, i) => (
            <FaStar key={i} />
          ))}
          {halfStar && <FaStarHalfAlt />}
          {[...Array(emptyStars)].map((_, i) => (
            <FaRegStar key={i} />
          ))}
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">₹{price}</span>
          <span className="text-sm text-gray-400 line-through">
            ₹{Math.round(price * 1.25)}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={() => addToCart(product)}
          className="mt-auto w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white py-2.5 text-sm font-medium hover:bg-blue-700 active:scale-95 transition"
        >
          <FaShoppingCart />
          Add to cart
        </button>
      </div>
    </div>
  );
}