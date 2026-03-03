import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaHeart } from "react-icons/fa";

export default function ProductCard({ product }) {
  const { name, price, oldPrice, rating, image } = product;

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 group flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-md">
      
      {/* Discount Badge */}
      {oldPrice && (
        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded z-10">
          {Math.round(((oldPrice - price) / oldPrice) * 100)}% OFF
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-full h-40 overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        {/* Product Name */}
        <h3 className="text-gray-800 font-medium text-sm sm:text-base md:text-lg mb-1 truncate">{name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400 text-xs sm:text-sm mb-2">
          {[...Array(fullStars)].map((_, i) => (
            <FaStar key={i} />
          ))}
          {halfStar && <FaStarHalfAlt />}
          {[...Array(emptyStars)].map((_, i) => (
            <FaRegStar key={i} />
          ))}
          <span className="text-gray-500 ml-1 text-xs sm:text-sm">({rating.toFixed(1)})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-blue-600 font-bold text-base sm:text-lg">${price}</span>
          {oldPrice && <span className="line-through text-gray-400 text-sm sm:text-base">${oldPrice}</span>}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-md text-sm sm:text-base font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
            <FaShoppingCart /> Add to Cart
          </button>
          <button className="p-2 bg-gray-100 rounded-md text-gray-700 hover:text-red-500 hover:bg-gray-200 transition shadow-md">
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
}