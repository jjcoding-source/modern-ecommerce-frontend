import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useReviews } from "../context/ReviewsContext";
import products from "../data/products"; 
import { FaStar, FaStarHalfAlt, FaRegStar, FaTruck, FaCheckCircle } from "react-icons/fa";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const { reviews, addReview } = useReviews();

  const product = products.find((p) => String(p.id) === String(id));
  const isInWishlist = product && wishlistItems.some((item) => item.id === product.id);

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Product not found
      </div>
    );
  }

  const productReviews = reviews[product.id] || [];

  const handleWishlist = () => {
    if (isInWishlist) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const handleAddReview = () => {
    if (reviewText && reviewRating > 0) {
      addReview(product.id, { text: reviewText, rating: reviewRating });
      setReviewText("");
      setReviewRating(0);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {[...Array(fullStars)].map((_, i) => <FaStar key={i} className="text-yellow-400" />)}
        {halfStar && <FaStarHalfAlt className="text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => <FaRegStar key={i} className="text-yellow-400" />)}
      </>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">

      {/* ---------------- Main Product Section ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Image */}
        <div className="bg-white rounded-3xl border shadow-md p-6 flex items-center justify-center hover:shadow-xl transition">
          <img src={product.image} alt={product.name} className="max-h-[450px] object-contain" />
        </div>

        {/* Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Price & Ratings */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-blue-600">₹{product.price}</span>
            {productReviews.length > 0 && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                {renderStars(productReviews.reduce((a,r) => a + r.rating,0)/productReviews.length)}
                <span>({productReviews.length})</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">{product.description || "High quality product crafted with attention to detail. Perfect for everyday use."}</p>

          {/* Product Highlights */}
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500"/> High-quality materials</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500"/> Modern design</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500"/> Durable & long-lasting</li>
            <li className="flex items-center gap-2"><FaTruck className="text-blue-500"/> Free shipping</li>
          </ul>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => addToCart(product)}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-blue-800 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={handleWishlist}
              className={`px-8 py-3 rounded-full border font-medium transition ${
                isInWishlist ? "bg-red-100 text-red-500 hover:bg-red-200" : "hover:bg-gray-100"
              }`}
            >
              {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- Reviews Section ---------------- */}
      <div className="bg-white p-6 rounded-3xl border shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>

        {/* Existing Reviews */}
        {productReviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {productReviews.map((r, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-2">
                <div className="flex items-center gap-2 mb-1">{renderStars(r.rating)}</div>
                <p className="text-gray-700">{r.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Add Review */}
        <div className="space-y-3 pt-4">
          <h3 className="font-medium text-gray-800">Leave a Review</h3>
          <div className="flex items-center gap-2">
            {[1,2,3,4,5].map((n) => (
              <button
                key={n}
                onClick={() => setReviewRating(n)}
                className={`text-2xl ${reviewRating >= n ? "text-yellow-400" : "text-gray-300"}`}
              >
                <FaStar />
              </button>
            ))}
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            className="w-full border rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddReview}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:from-blue-600 hover:to-blue-800 transition"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}