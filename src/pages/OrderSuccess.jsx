import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-3xl font-semibold mb-3">
        Order placed successfully 🎉
      </h1>

      <p className="text-gray-500 mb-6">
        Thank you for your purchase.
      </p>

      <Link
        to="/"
        className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        Continue shopping
      </Link>
    </div>
  );
}