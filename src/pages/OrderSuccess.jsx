import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-semibold mb-4">
        Order placed successfully 🎉
      </h1>

      <p className="text-gray-600 mb-8">
        Thank you for your purchase. Your order is being processed.
      </p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-blue-600 text-white"
        >
          Continue shopping
        </Link>

        <Link
          to="/admin/orders"
          className="px-6 py-3 rounded-full border"
        >
          View orders (admin)
        </Link>
      </div>
    </div>
  );
}