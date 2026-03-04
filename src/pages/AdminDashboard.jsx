
import { Link, Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/admin/users" className="hover:text-blue-600">Users</Link>
          <Link to="/admin/products" className="hover:text-blue-600">Products</Link>
          <Link to="/admin/orders" className="hover:text-blue-600">Orders</Link>
          <Link to="/" className="hover:text-red-500 mt-auto">Back to Store</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet /> 
      </main>
    </div>
  );
}