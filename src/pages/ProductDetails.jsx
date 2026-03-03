import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import products from "../data/products"; 

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find(
    (p) => String(p.id) === String(id)
  );

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Image */}
        <div className="bg-white rounded-2xl border p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[420px] object-contain"
          />
        </div>

        {/* Info */}
        <div className="space-y-5">
          <h1 className="text-3xl font-semibold">
            {product.name}
          </h1>

          <p className="text-gray-500">
            {product.description || "High quality product with modern design."}
          </p>

          <p className="text-3xl font-bold text-blue-600">
            ${product.price}
          </p>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => addToCart(product)}
              className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Add to cart
            </button>

            <button className="px-8 py-3 rounded-full border font-medium hover:bg-gray-100 transition">
              Add to wishlist
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}