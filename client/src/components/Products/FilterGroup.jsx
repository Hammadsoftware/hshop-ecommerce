import React from "react";
import { AiOutlineFilter } from "react-icons/ai";

export function ProductFilter({
  categories = [],
  setCategories = () => {},
  colors = [],
  setColors = () => {},
  sizes = [],
  setSizes = () => {},
  availability = "",
  setAvailability = () => {},
  priceRange = [0, 300],
  setPriceRange = () => {},
  showMobileFilters = false,
  setShowMobileFilters = () => {},
  isMobile = false,
}) {
  // Helper for checkbox state
  const handleCheckbox = (e, setter) => {
    const { value, checked } = e.target;
    setter((prev) => (checked ? [...prev, value] : prev.filter((v) => v !== value)));
  };

  // Helper for color selection (toggle)
  const handleColorClick = (color) => {
    setColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const filterContent = (
    <>
      <h3 className="text-xl font-semibold mb-4">Filters</h3>
      <div className="mb-5">
        <h4 className="font-semibold text-gray-700 mb-2">Category</h4>
        <div className="flex flex-col gap-2 text-sm">
          {["Shirt", "Pant", "Jacket", "Dress"].map((cat) => (
            <label key={cat} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={cat}
                checked={categories.includes(cat)}
                onChange={(e) => handleCheckbox(e, setCategories)}
                className="accent-blue-600"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-5">
        <h4 className="font-semibold text-gray-700 mb-2">Color</h4>
        <div className="flex gap-2">
          {["Red", "Blue", "Green", "Black", "White"].map((color) => (
            <div
              key={color}
              className={`w-6 h-6 rounded-full border-2 cursor-pointer ${colors.includes(color) ? "ring-2 ring-black" : ""}`}
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
              onClick={() => handleColorClick(color)}
            ></div>
          ))}
        </div>
      </div>
      <div className="mb-5">
        <h4 className="font-semibold text-gray-700 mb-2">Size</h4>
        <div className="flex flex-col gap-2 text-sm">
          {["S", "M", "L", "XL"].map((size) => (
            <label key={size} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={size}
                checked={sizes.includes(size)}
                onChange={(e) => handleCheckbox(e, setSizes)}
                className="accent-blue-600"
              />
              {size}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-5">
        <h4 className="font-semibold text-gray-700 mb-2">Availability</h4>
        <div className="flex flex-col gap-2 text-sm">
          {["In Stock", "Out of Stock"].map((avail) => (
            <label key={avail} className="flex items-center gap-2">
              <input
                type="radio"
                name="availability"
                value={avail}
                checked={availability === avail}
                onChange={(e) => setAvailability(e.target.value)}
                className="accent-blue-600"
              />
              {avail}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-5">
        <h4 className="font-semibold text-gray-700 mb-2">Price Range</h4>
        <div className="flex flex-col">
          <input
            type="range"
            min="0"
            max="300"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full accent-black"
          />
          <div className="text-sm mt-1 text-gray-600">Up to ${priceRange[1]}</div>
        </div>
      </div>
    </>
  );

  // Mobile: show as a drawer/modal if showMobileFilters is true, otherwise show a button
  if (isMobile) {
    return (
      <>
        <button
          className="md:hidden w-fit mb-4 flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg shadow"
          onClick={() => setShowMobileFilters(true)}
        >
          <AiOutlineFilter size={20} />
          Filters
        </button>
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-start md:hidden">
            <div className="bg-white rounded-xl shadow-lg w-[95vw] max-w-md mt-8 p-5 relative">
              <button
                className="absolute top-2 right-2 text-gray-600 text-2xl"
                onClick={() => setShowMobileFilters(false)}
              >
                &times;
              </button>
              {filterContent}
              <button
                className="w-full mt-4 bg-black text-white py-2 rounded-lg"
                onClick={() => setShowMobileFilters(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside className="hidden md:block w-full md:w-72 bg-white p-5 rounded-xl shadow-md">
      {filterContent}
    </aside>
  );
}