export default function ProductCard({ product }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-2"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-blue-600 font-bold">${product.price}</p>
      <p className="text-yellow-500">Rating: {product.rating} ⭐</p>
    </div>
  );
}