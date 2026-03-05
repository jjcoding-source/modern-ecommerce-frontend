import { useState } from "react";
import { useProducts } from "../../context/ProductsContext";

const emptyForm = {
  id: null,
  name: "",
  price: "",
  rating: "",
  image: ""
};

export default function ProductsPage() {

  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct
  } = useProducts();

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateId = () => {
    if (products.length === 0) return 1;
    return Math.max(...products.map(p => p.id)) + 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.image) {
      alert("Please fill required fields");
      return;
    }

    if (editingId) {

      updateProduct({
        id: editingId,
        name: form.name,
        price: Number(form.price),
        rating: Number(form.rating),
        image: form.image
      });

    } else {

      addProduct({
        id: generateId(),
        name: form.name,
        price: Number(form.price),
        rating: Number(form.rating),
        image: form.image
      });

    }

    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      id: product.id,
      name: product.name,
      price: product.price,
      rating: product.rating,
      image: product.image
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this product?")) return;
    deleteProduct(id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div className="p-6 space-y-8">

      <h2 className="text-2xl font-bold">Manage Products</h2>

      {/* Add / Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-xl shadow grid md:grid-cols-5 gap-4"
      >

        <input
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />

        <input
          name="rating"
          type="number"
          step="0.1"
          placeholder="Rating"
          value={form.rating}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="border rounded px-3 py-2 md:col-span-2"
        />

        <div className="flex gap-2 md:col-span-5">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-200 px-5 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Products table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">ID</th>
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
                <td className="border px-3 py-2">{p.id}</td>
                <td className="border px-3 py-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-12 object-cover rounded"
                  />
                </td>
                <td className="border px-3 py-2">{p.name}</td>
                <td className="border px-3 py-2">₹{p.price}</td>
                <td className="border px-3 py-2">{p.rating}</td>
                <td className="border px-3 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-5 text-gray-500">
                  No products found
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
}