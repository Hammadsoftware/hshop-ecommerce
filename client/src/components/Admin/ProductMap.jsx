import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Common/Loader';
import { FiRefreshCw, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

const ProductMap = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch all products from the API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/product/getAllProducts');
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:3000/product/deleteProduct/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      alert("Error deleting product");
    }
  };

  // Start editing
  const handleEdit = (product) => {
    setEditId(product._id);
    setEditData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      stock: product.stock,
      rating: product.rating,
      color: Array.isArray(product.color) ? product.color.join(', ') : product.color,
      size: Array.isArray(product.size) ? product.size.join(', ') : product.size,
    });
  };


  // Handle edit input change
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Save updated product
  const handleSave = async (id) => {
    try {
      const updated = {
        ...editData,
        price: Number(editData.price),
        stock: Number(editData.stock),
        rating: Number(editData.rating),
        color: editData.color.split(',').map(c => c.trim()),
        size: editData.size.split(',').map(s => s.trim()),
      };
      await axios.put(`http://localhost:3000/product/updateProduct/${id}`, updated);
      setEditId(null);
      fetchProducts();
    } catch (error) {
      alert("Error updating product");
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditId(null);
    setEditData({});
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-center">All Products</h2>
        <button
          onClick={fetchProducts}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded shadow transition"
        >
          <FiRefreshCw className="w-5 h-5" />
          Refresh
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-blue-100 to-blue-200">
                <th className="px-6 py-4 border font-bold text-lg text-gray-800">Image</th>
                <th className="px-6 py-4 border font-bold text-lg text-gray-800">Name</th>
                <th className="px-6 py-4 border font-bold text-lg text-gray-800">Price</th>
                <th className="px-6 py-4 border font-bold text-lg text-gray-800">Category</th>
                <th className="px-6 py-4 border font-bold text-lg text-gray-800">Description</th>
                <th className="px-6 py-4 border font-bold text-lg text-gray-800">Stock</th>
                <th className="px-6 py-4 border font-bold text-lg text-gray-800">Rating</th>
                <th className="px-6 py-4 border font-bold text-lg text-gray-800">Colors</th>
                <th className="px-6 py-4 border font-bold text-lg text-gray-800">Sizes</th>
                <th className="px-6 py-4 border font-bold text-lg text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <tr
                  key={product._id}
                  className={`text-center transition ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-blue-100`}
                >
                  <td className="border px-4 py-3">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-contain h-20 w-20 mx-auto rounded shadow"
                        style={{ background: "#f3f4f6" }}
                      />
                    )}
                  </td>
                  {editId === product._id ? (
                    <>
                      <td className="border px-4 py-3">
                        <input
                          name="name"
                          value={editData.name}
                          onChange={handleEditChange}
                          className="border rounded px-2 py-1 w-full font-bold"
                        />
                      </td>
                      <td className="border px-4 py-3">
                        <input
                          name="price"
                          type="number"
                          value={editData.price}
                          onChange={handleEditChange}
                          className="border rounded px-2 py-1 w-full font-bold"
                        />
                      </td>
                      <td className="border px-4 py-3">
                        <input
                          name="category"
                          value={editData.category}
                          onChange={handleEditChange}
                          className="border rounded px-2 py-1 w-full font-semibold"
                        />
                      </td>
                      <td className="border px-4 py-3">
                        <input
                          name="description"
                          value={editData.description}
                          onChange={handleEditChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="border px-4 py-3">
                        <input
                          name="stock"
                          type="number"
                          value={editData.stock}
                          onChange={handleEditChange}
                          className="border rounded px-2 py-1 w-full font-semibold"
                        />
                      </td>
                      <td className="border px-4 py-3">
                        <input
                          name="rating"
                          type="number"
                          value={editData.rating}
                          onChange={handleEditChange}
                          className="border rounded px-2 py-1 w-full font-semibold"
                        />
                      </td>
                      <td className="border px-4 py-3">
                        <input
                          name="color"
                          value={editData.color}
                          onChange={handleEditChange}
                          className="border rounded px-2 py-1 w-full font-semibold"
                          placeholder="red, blue"
                        />
                      </td>
                      <td className="border px-4 py-3">
                        <input
                          name="size"
                          value={editData.size}
                          onChange={handleEditChange}
                          className="border rounded px-2 py-1 w-full font-semibold"
                          placeholder="S, M, L"
                        />
                      </td>
                      <td className="border px-4 py-3">
                        <div className="flex flex-col gap-2 items-center">
                          <button
                            onClick={() => handleSave(product._id)}
                            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow transition"
                          >
                            <FiCheck className="w-5 h-5" />
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-full font-bold shadow transition"
                          >
                            <FiX className="w-5 h-5" />
                            Cancel
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border px-4 py-3 font-bold text-base text-gray-900">{product.name}</td>
                      <td className="border px-4 py-3 font-bold text-base text-blue-700">${product.price}</td>
                      <td className="border px-4 py-3 font-semibold text-base">{product.category}</td>
                      <td className="border px-4 py-3 text-base">{product.description}</td>
                      <td className="border px-4 py-3 font-semibold text-base">{product.stock}</td>
                      <td className="border px-4 py-3 font-semibold text-base">{product.rating}</td>
                      <td className="border px-4 py-3 font-semibold text-base">
                        {Array.isArray(product.color) ? product.color.join(', ') : product.color}
                      </td>
                      <td className="border px-4 py-3 font-semibold text-base">
                        {Array.isArray(product.size) ? product.size.join(', ') : product.size}
                      </td>
                      <td className="border px-4 py-3">
                        <div className="flex flex-row gap-2 items-center justify-center">
                          <button
                            onClick={() => handleEdit(product)}
                            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full font-bold shadow transition"
                          >
                            <FiEdit2 className="w-5 h-5" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-bold shadow transition"
                          >
                            <FiTrash2 className="w-5 h-5" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {products.length === 0 && !loading && (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-xl text-gray-400 font-bold">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductMap;