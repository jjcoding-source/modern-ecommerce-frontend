import { useEffect, useState } from "react";
import productsData from "../../data/products";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    rating: "",
    image: ""
  });

  // Load products
  useEffect(() => {
    const stored = localStorage.getItem("admin_products");
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(productsData);
    }
  }, []);

  // Save products
  useEffect(() => {
    localStorage.setItem("admin_products", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      rating: "",
      image: ""
    });
    setEditingProduct(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.image) {
      alert("Please fill required fields");
      return;
    }

    if (editingProduct) {
      // update
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: form.name,
                price: Number(form.price),
                rating: Number(form.rating),
                image: form.image
              }
            : p
        )
      );
    } else {
      // add
      const newProduct = {
        id: Date.now(),
        name: form.name,
        price: Number(form.price),
        rating: Number(form.rating),
        image: form.image
      };

      setProducts((prev) => [...prev, newProduct]);
    }

    resetForm();
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      rating: product.rating,
      image: product.image
    });
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Delete this product?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">

      {/* Form */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          {editingProduct ? "Edit Product" : "Add Product"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />

          <input
            name="rating"
            type="number"
            step="0.1"
            placeholder="Rating"
            value={form.rating}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />

          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              {editingProduct ? "Update" : "Add"}
            </button>

            {editingProduct && (
              <button
                type="button"
                onClick={resetForm}
                className="border px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Products</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Image</th>
                <th className="border px-3 py-2">Name</th>
                <th className="border px-3 py-2">Price</th>
                <th className="border px-3 py-2">Rating</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>

                  <td className="border px-3 py-2">{p.name}</td>

                  <td className="border px-3 py-2">₹{p.price}</td>

                  <td className="border px-3 py-2">{p.rating}</td>

                  <td className="border px-3 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => editProduct(p)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}