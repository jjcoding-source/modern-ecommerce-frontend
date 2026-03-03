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
    <aside
      className="
        w-full md:w-[270px] lg:w-[290px]
        rounded-2xl
        bg-white/90 backdrop-blur
        border border-gray-100
        shadow-[0_10px_35px_rgba(0,0,0,0.08)]
        hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]
        transition-all duration-300
        p-5
        h-fit
        md:sticky md:top-24
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400">
            Product Filters
          </p>
          <h2 className="text-lg font-semibold text-gray-900">
            Refine Results
          </h2>
        </div>

        <button
          onClick={() => {
            setSelectedCategories([]);
            setPriceRange([0, 500]);
            setRating(0);
          }}
          className="text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          Reset
        </button>
      </div>

      {/* Categories */}
      <section className="mb-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          Categories
        </h3>

        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat}
              htmlFor={cat}
              className="
                flex items-center justify-between
                rounded-lg border border-gray-100
                bg-gray-50/60
                px-3 py-2
                cursor-pointer
                hover:bg-white
                hover:shadow-sm
                transition
              "
            >
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  id={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="accent-blue-600"
                />
                {cat}
              </div>

              {selectedCategories.includes(cat) && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  selected
                </span>
              )}
            </label>
          ))}
        </div>
      </section>

      {/* Price Range */}
      <section className="mb-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          Price Range
        </h3>

        <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-4">
          {/* Inputs */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1">
              <label className="text-[11px] text-gray-400">Min</label>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="
                  mt-1 w-full rounded-lg border border-gray-200
                  px-2 py-1.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
              />
            </div>

            <div className="flex-1">
              <label className="text-[11px] text-gray-400">Max</label>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="
                  mt-1 w-full rounded-lg border border-gray-200
                  px-2 py-1.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
              />
            </div>
          </div>

          {/* Visual slider feel (single slider controlling max) */}
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-full accent-blue-600"
          />

          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>₹0</span>
            <span>₹500+</span>
          </div>
        </div>
      </section>

      {/* Rating */}
      <section className="mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          Minimum Rating
        </h3>

        <div className="grid grid-cols-3 gap-2">
          {[0, 3, 4, 5].map((r) => (
            <button
              key={r}
              onClick={() => setRating(r)}
              className={`
                text-xs py-2 rounded-lg border
                transition
                ${
                  rating === r
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                }
              `}
            >
              {r === 0 ? "All" : `${r}★ & up`}
            </button>
          ))}
        </div>
      </section>

      {/* Apply */}
      <button
        className="
          w-full
          rounded-xl
          bg-gradient-to-r from-blue-600 to-indigo-600
          text-white
          py-3
          text-sm font-semibold
          shadow-lg
          hover:shadow-xl
          transition
          active:scale-[0.98]
        "
      >
        Apply Filters
      </button>
    </aside>
  );
}