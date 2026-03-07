import { useEffect, useState } from "react";
import SidebarFilter from "../../components/SidebarFilter";
import productsData from "../../data/products";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    rating: "",
    image: "",
    category: "Electronics",
  });

  // Load products from localStorage or fallback to productsData
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("admin_products"));
    if (storedProducts && storedProducts.length > 0) {
      setProducts(storedProducts);
      setFilteredProducts(storedProducts);
    } else {
      setProducts(productsData);
      setFilteredProducts(productsData);
      localStorage.setItem("admin_products", JSON.stringify(productsData));
    }
  }, []);

  // Save products whenever they change
  useEffect(() => {
    localStorage.setItem("admin_products", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ name: "", price: "", rating: "", image: "", category: "Electronics" });
    setEditingProduct(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image) {
      alert("Please fill required fields");
      return;
    }

    if (editingProduct) {
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? { ...p, ...form, price: Number(form.price), rating: Number(form.rating) }
          : p
      );
      setProducts(updated);
      setFilteredProducts(updated);
    } else {
      const newProduct = {
        id: Date.now(),
        ...form,
        price: Number(form.price),
        rating: Number(form.rating),
      };
      const updated = [...products, newProduct];
      setProducts(updated);
      setFilteredProducts(updated);
    }

    resetForm();
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      rating: product.rating,
      image: product.image,
      category: product.category || "Electronics",
    });
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Delete this product?")) return;
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    setFilteredProducts(updated);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-5">
      {/* Sidebar Filter */}
      <SidebarFilter products={products} onFilter={setFilteredProducts} />

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Add / Edit Form */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            {editingProduct ? "Edit Product" : "Add Product"}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            >
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Shoes</option>
              <option>Home</option>
              <option>Toys</option>
            </select>

            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                {editingProduct ? "Update" : "Add"}
              </button>
              {editingProduct && (
                <button type="button" onClick={resetForm} className="border px-5 py-2 rounded-lg">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-gray-500">₹{p.price}</p>
                <p className="text-yellow-500">{"★".repeat(Math.round(p.rating))}</p>
                <div className="flex gap-2 mt-3">
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
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
}