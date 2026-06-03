import { useState } from "react";
import React from "react";
import blackJacket from "../../assets/blackJaket.jpeg";
import redJacket from "../../assets/whiteJacket.jpeg";
import Addbtn from "./Addbtn";
import { useDispatch } from "react-redux";
 import { setCart } from "../../redux/cartSlice";
  import { toast } from 'react-toastify';
const ProductPage = () => {
  const images = [blackJacket, redJacket];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch=useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!selectedColor || !selectedSize) {
      alert("Please select a color and size before adding to cart.");
      return;
    }
  
    setIsLoading(true);
  
    const formData = {
      image: selectedImage,
      color: selectedColor,
      size: selectedSize,
      quantity,
      price: "$120",
      id:Math.random().toString(36).substr(2, 9),
    };

    // Dispatch the action to update the cart in Redux store
    dispatch(setCart({ items: formData, total: 120 * quantity }));
  
    console.log("Form Data:", formData);
  
    // Simulate a loading time of 2 seconds
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Product added to cart successfully!');
    }, 2000);
  
    // Later, you can send this data to your backend or cart
  };
  return (
    <form onSubmit={handleSubmit} className="flex lg:flex-row flex-col p-6 gap-6">
      {/* Left Side */}
      <div className="flex lg:flex-col flex-row items-center gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            className={`w-22 h-22 object-cover rounded-lg cursor-pointer border-2 ${
              selectedImage === img ? "border-black" : "border-gray-300"
            }`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      {/* Main Image */}
      <div>
        <img
          src={selectedImage}
          alt="Selected"
          className="w-[194px] lg:h-[259px]  object-cover rounded-xl"
        />
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-start gap-4">
        <h1 className="text-2xl font-bold">Stylish Jacket</h1>
        <div className="text-gray-500 line-through">$150</div>
        <div className="text-xl font-semibold">$120</div>
        <p className="text-gray-600">This is a stylish jacket perfect for any occasion</p>

        {/* Color options */}
        <div className="flex items-center gap-2 mt-2">
          <div
            className={`w-6 h-6 bg-red-700 rounded-full cursor-pointer ${
              selectedColor === "Red" ? "ring-2 ring-black" : ""
            }`}
            onClick={() => setSelectedColor("Red")}
          ></div>
          <div
            className={`w-6 h-6 bg-black rounded-full cursor-pointer ${
              selectedColor === "Black" ? "ring-2 ring-black" : ""
            }`}
            onClick={() => setSelectedColor("Black")}
          ></div>
        </div>

        {/* Size options */}
        <div className="flex items-center gap-2 mt-4">
          {["S", "M", "L", "XL"].map((size) => (
            <button
              type="button"
              key={size}
              className={`border px-4 py-1 rounded-md ${
                selectedSize === size
                  ? "bg-black text-white"
                  : "hover:bg-black hover:text-white"
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2 mt-4">
          <button
            type="button"
            className="border px-2 py-1"
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            className="border px-2 py-1"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        {
          isLoading ? (
           <Addbtn />
          ) : (
            <button
              type="submit"
              className="mt-4 bg-black text-white px-6 py-2 rounded-md"
              disabled={!selectedColor || !selectedSize}
            >
              ADD TO CART
            </button>
          )
        }
      

        {/* Characteristics */}
        <div className="mt-8">
          <h2 className="font-semibold">Characteristics:</h2>
          <p><strong>Brand:</strong> FashionBrand</p>
          <p><strong>Material:</strong> Leather</p>
        </div>
      </div>
    </form>
  );
};

export default ProductPage;
