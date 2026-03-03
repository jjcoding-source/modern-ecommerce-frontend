import { useState } from "react";

export default function SidebarFilter() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [rating, setRating] = useState(0);

  const categories = ["Electronics", "Fashion", "Shoes", "Home", "Toys"];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <aside className="w-full md:w-1/4 bg-white p-4 shadow-md rounded-lg mb-6 md:mb-0">
      <h2 className="text-xl font-semibold mb-4">Filter Products</h2>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Categories</h3>
        {categories.map((cat) => (
          <div key={cat} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={cat}
              checked={selectedCategories.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="mr-2"
            />
            <label htmlFor={cat}>{cat}</label>
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="border rounded-md px-2 py-1 w-20"
          />
          <span>-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="border rounded-md px-2 py-1 w-20"
          />
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Rating</h3>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border rounded-md px-2 py-1 w-full"
        >
          <option value={0}>All Ratings</option>
          <option value={1}>1 star & up</option>
          <option value={2}>2 stars & up</option>
          <option value={3}>3 stars & up</option>
          <option value={4}>4 stars & up</option>
          <option value={5}>5 stars</option>
        </select>
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full">
        Apply Filter
      </button>
    </aside>
  );
}