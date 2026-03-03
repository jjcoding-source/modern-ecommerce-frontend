import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart } from "react-icons/fa";

export default function ProductCard({ product }) {
  const { name, price, rating, image } = product;

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative group">
      {/* Discount Badge */}
      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
        -20%
      </div>

      <img src={image} alt={name} className="w-full h-48 object-cover" />

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <p className="text-blue-600 font-bold text-xl mb-2">${price}</p>

        {/* Rating */}
        <div className="flex items-center mb-2">
          {[...Array(fullStars)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400" />
          ))}
          {halfStar && <FaStarHalfAlt className="text-yellow-400" />}
          {[...Array(emptyStars)].map((_, i) => (
            <FaRegStar key={i} className="text-yellow-400" />
          ))}
        </div>

        <button className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 opacity-0 group-hover:opacity-100">
          <FaShoppingCart className="mr-2" /> Add to Cart
        </button>
      </div>
    </div>
  );
}