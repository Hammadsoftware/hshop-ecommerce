import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import Loader from "../Common/Loader"; // Make sure this path is correct

const renderStars = (rating = 0) => {
  return Array.from({ length: 5 }, (_, i) =>
    i < Math.round(rating) ? (
      <AiFillStar key={i} className="text-yellow-400" />
    ) : (
      <AiOutlineStar key={i} className="text-yellow-400" />
    )
  );
};

const ProductDetailShow = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/product/getProductById/${id}`);
        const data = await res.json();
        setProduct(data);
        setSelectedColor(data.color?.[0] || "");
        setSelectedSize(data.size?.[0] || "");
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.warning("Please select a color and size");
      return;
    }

    const item = {
      ...product,
      selectedColor,
      selectedSize,
      quantity,
      id: product._id || product.id,
    };

    dispatch(setCart({ items: item, total: Number(product.price) * quantity }));
    toast.success("Added to cart!");
  };

  if (loading || !product) return (
  
    <div className="flex items-center justify-center h-screen">
      <Loader />
    </div>  
  )

  const image =
    product.image?.startsWith("data:image") || product.image?.startsWith("http")
      ? product.image
      : "https://via.placeholder.com/400x400?text=No+Image";

  const rating = typeof product.rating === "number" ? product.rating : 0;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="relative h-96">
          <img
            src={image}
            alt={product.name || "Product"}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Product Info */}
        <div className="p-6 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name || "Product Name"}</h1>
          <div className="flex items-center gap-2">{renderStars(rating)}</div>
          <p className="text-gray-600">{product.description || "No description available."}</p>
          <div className="flex gap-4 items-center text-xl">
            <span className="font-semibold">${Number(product.price || 0).toFixed(2)}</span>
          </div>

          {/* Color Selection */}
          {product.color && product.color.length > 0 && (
            <div className="flex gap-2 mt-2">
              {product.color.map((color) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    selectedColor === color ? "border-black" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          )}

          {/* Size Selection */}
          {product.size && product.size.length > 0 && (
            <div className="flex gap-2 mt-2">
              {product.size.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 rounded-md border ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              className="px-2 py-1 border"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-2 py-1 border"
            >
              +
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailShow;
