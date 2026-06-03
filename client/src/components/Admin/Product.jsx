import React, { useRef, useState } from 'react';
import axios from 'axios';
import ProductMap from './ProductMap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDashboard = () => {
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const stockRef = useRef();
  const ratingRef = useRef();
  const sizeRef = useRef();
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  // State for dynamic colors and sizes
  const [colors, setColors] = useState([]);
  const [colorInput, setColorInput] = useState("");
  const [sizes, setSizes] = useState([]);
  const [sizeInput, setSizeInput] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result); // base64 data URL
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  // Add color
  const handleAddColor = () => {
    if (colorInput && !colors.includes(colorInput.trim().toLowerCase())) {
      setColors([...colors, colorInput.trim().toLowerCase()]);
      setColorInput("");
    }
  };

  // Remove color
  const handleRemoveColor = (color) => {
    setColors(colors.filter(c => c !== color));
  };

  // Add size
  const handleAddSize = () => {
    if (sizeInput && !sizes.includes(sizeInput.trim().toUpperCase())) {
      setSizes([...sizes, sizeInput.trim().toUpperCase()]);
      setSizeInput("");
    }
  };

  // Remove size
  const handleRemoveSize = (size) => {
    setSizes(sizes.filter(s => s !== size));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const product = {
      name: nameRef.current.value,
      price: Number(priceRef.current.value),
      description: descriptionRef.current.value,
      image: imagePreview,
      category: categoryRef.current.value,
      stock: Number(stockRef.current.value),
      rating: Number(ratingRef.current.value),
      color: colors,
      size: sizes,
    };

    try {
      await axios.post('http://localhost:3000/product/createProduct', product);
      toast.success("Product created successfully!");
      // Optionally reset form
      nameRef.current.value = "";
      priceRef.current.value = "";
      descriptionRef.current.value = "";
      categoryRef.current.value = "";
      stockRef.current.value = "";
      ratingRef.current.value = "";
      setImagePreview("");
      setColors([]);
      setSizes([]);
    } catch (error) {
      toast.error("Error creating product");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Add Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                placeholder="Product Name"
                className="mt-1 w-full p-2 border rounded"
                ref={nameRef}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                placeholder="Write a brief description..."
                className="mt-1 w-full p-2 border rounded"
                ref={descriptionRef}
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input
                type="number"
                min="0"
                placeholder="Price"
                className="mt-1 w-full p-2 border rounded"
                ref={priceRef}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                className="mt-1 w-full p-2 border rounded"
                ref={categoryRef}
                placeholder="Enter or select category"
                list="category-list"
                required
              />
              <datalist id="category-list">
                <option value="clothing" />
                <option value="electronics" />
                <option value="accessories" />
                <option value="home & kitchen" />
              </datalist>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                min="0"
                placeholder="Stock"
                className="mt-1 w-full p-2 border rounded"
                ref={stockRef}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="Rating"
                className="mt-1 w-full p-2 border rounded"
                ref={ratingRef}
              />
            </div>
            {/* Colors input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Colors</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={colorInput}
                  onChange={e => setColorInput(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Type color and press Add"
                />
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {colors.map(color => (
                  <span key={color} className="bg-gray-200 px-2 py-1 rounded flex items-center">
                    {color}
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(color)}
                      className="ml-1 text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            {/* Sizes input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Sizes</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={sizeInput}
                  onChange={e => setSizeInput(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Type size (e.g. S, M, L) and press Add"
                />
                <button
                  type="button"
                  onClick={handleAddSize}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <span key={size} className="bg-gray-200 px-2 py-1 rounded flex items-center">
                    {size}
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(size)}
                      className="ml-1 text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                accept="image/*"
                ref={imageRef}
                className="mt-1 w-full p-2 border rounded"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-40 mt-2"
                />
              )}
            </div>
            <div>
              <button
                type="submit"
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <ProductMap/>
    </div>
  );
};

export default ProductDashboard;