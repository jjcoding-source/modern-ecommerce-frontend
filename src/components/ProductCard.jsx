import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaHeart
} from "react-icons/fa";

export default function ProductCard({ product }) {
  const { name, price, rating, image } = product;

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="group relative bg-white rounded-xl border hover:shadow-2xl transition-all duration-300 overflow-hidden">

      {/* wishlist */}
      <button className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow hover:scale-110 transition">
        <FaHeart className="text-gray-400 group-hover:text-red-500" />
      </button>

      {/* discount badge */}
      <span className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
        20% OFF
      </span>

      {/* image */}
      <div className="relative w-full h-[170px] flex items-center justify-center bg-gray-50 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* content */}
      <div className="p-4 flex flex-col gap-2">

        {/* title */}
        <h3 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2 min-h-[38px]">
          {name}
        </h3>

        {/* rating */}
        <div className="flex items-center gap-1 text-yellow-400 text-sm">
          {[...Array(fullStars)].map((_, i) => (
            <FaStar key={i} />
          ))}
          {halfStar && <FaStarHalfAlt />}
          {[...Array(emptyStars)].map((_, i) => (
            <FaRegStar key={i} />
          ))}

          <span className="text-gray-500 text-xs ml-1">
            ({rating})
          </span>
        </div>

        {/* price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ${(price * 1.25).toFixed(0)}
          </span>
        </div>

        {/* actions */}
        <div className="mt-2">
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition">
            <FaShoppingCart />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}