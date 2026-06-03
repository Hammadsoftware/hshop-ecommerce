import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiOutlineShoppingCart, AiFillStar, AiOutlineStar } from "react-icons/ai";

const ActionIcon = ({ icon }) => (
  <button className="p-2 rounded-full bg-black/70 text-white hover:bg-black transition">{icon}</button>
);

function renderStars(rating = 0) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= Math.round(rating)
        ? <AiFillStar key={i} className="text-yellow-400 inline" />
        : <AiOutlineStar key={i} className="text-yellow-400 inline" />
    );
  }
  return stars;
}

function ProductCard({ product }) {
  const id = product._id || product.id || "";
  const name = product.name || "Unnamed Product";
  const image = product.image || "https://via.placeholder.com/300x400?text=No+Image";
  const rating = typeof product.rating === "number" ? product.rating : 0;
  let price = "N/A";
  if (typeof product.price === "number") {
    price = product.price.toFixed(2);
  } else if (typeof product.price === "string") {
    const match = product.price.match(/[\d,.]+/);
    price = match ? parseFloat(match[0].replace(/,/g, "")).toFixed(2) : "N/A";
  }
  let originalPrice = null;
  if (product.originalPrice !== undefined) {
    if (typeof product.originalPrice === "number") {
      originalPrice = product.originalPrice.toFixed(2);
    } else if (typeof product.originalPrice === "string") {
      const match = product.originalPrice.match(/[\d,.]+/);
      originalPrice = match ? parseFloat(match[0].replace(/,/g, "")).toFixed(2) : null;
    }
  }

  return (
    <Link to={`/products/${id}`} key={id}>
      <div className="group flex flex-col bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
        <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute right-2 bottom-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
            <ActionIcon icon={<AiOutlineHeart size={20} />} />
            <ActionIcon icon={<AiOutlineShoppingCart size={20} />} />
          </div>
        </div>
        <div className="p-4 text-center">
          <h5 className="text-gray-800 font-medium truncate">{name}</h5>
          <div className="flex justify-center items-center gap-1 mt-2">
            {renderStars(rating)}
          </div>
          <div className="mt-2 flex justify-center items-center gap-2">
            <span className="font-semibold text-gray-900">
              {price !== "N/A" ? `$${price}` : "N/A"}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProductGrid({ products }) {
  const productArray = Array.isArray(products) ? products : [];

  if (productArray.length === 0) {
    return (
      <div className="flex-1 pt-10 text-center text-gray-500 text-lg">
        No products found.
      </div>
    );
  }

  return (
    <div className="flex-1 pt-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {productArray.map((product) => (
        <ProductCard product={product} key={product._id || product.id} />
      ))}
    </div>
  );
}