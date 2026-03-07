import { useEffect, useState } from "react";

export default function SidebarFilter({ products, onFilter }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState(0);

  const categories = ["Electronics", "Fashion", "Shoes", "Home", "Toys"];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (rating > 0) {
      filtered = filtered.filter((p) => p.rating >= rating);
    }

    onFilter(filtered);
  }, [selectedCategories, priceRange, rating, products]);

  return (
    <aside className="w-full md:w-[260px] bg-white p-5 rounded-2xl shadow-md h-fit">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Categories */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold mb-2">Categories</h3>
        {categories.map((cat) => (
          <label key={cat} className="block text-sm">
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="mr-2"
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Price */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold mb-2">Max Price</h3>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full"
        />
        <p className="text-sm mt-1">₹0 - ₹{priceRange[1]}</p>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Rating</h3>
        {[0, 3, 4, 5].map((r) => (
          <button
            key={r}
            onClick={() => setRating(r)}
            className="block w-full text-left text-sm border px-3 py-2 rounded mb-1 hover:bg-gray-100"
          >
            {r === 0 ? "All Ratings" : `${r}★ & up`}
          </button>
        ))}
      </div>
    </aside>
  );
}