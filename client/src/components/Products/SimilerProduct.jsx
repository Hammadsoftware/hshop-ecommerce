import React from "react";
import { Link } from "react-router-dom";
import products from "../Common/Data"; // Make sure this file has image, name, price, and originalPrice
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

function SimilarProduct() {
  return (
    <div className="p-6 pt-5 h-auto lg:h-[800px] bg-gray-100">
      <h2 className="text-2xl lg:text-5xl text-center pt-10 pb-20 font-bold mb-4">Similar Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((product, index) => (
          <Link to={`/products/${product.id}`} key={index}>
            <div className="group flex flex-col max-w-xs w-full overflow-hidden border border-gray-100 bg-white shadow-md rounded-lg">
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  className="absolute top-0 right-0 h-full w-full object-cover"
                  src={product.image}
                  alt={product.name}
                />
                <div className="absolute bottom-0 mb-4 flex w-full justify-center space-x-2">
                  <div className="h-3 w-3 rounded-full border-2 border-white bg-white"></div>
                  <div className="h-3 w-3 rounded-full border-2 border-white bg-transparent"></div>
                  <div className="h-3 w-3 rounded-full border-2 border-white bg-transparent"></div>
                </div>
                <div className="absolute -right-16 bottom-0 space-y-2 transition-all duration-300 group-hover:right-2">
                  <button className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white hover:bg-gray-700 rounded-full">
                    <AiOutlineHeart size={20} />
                  </button>
                </div>
              </div>
              <div className="mt-4 px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-slate-900 text-center">
                  {product.name}
                </h5>
                <div className="mt-2 mb-5 flex items-center justify-center space-x-3">
                  <span className="text-2xl font-bold text-slate-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-900 line-through">${product.originalPrice}</span>
                  )}
                </div>
                <button className="flex items-center justify-center bg-gray-900 px-3 py-2 text-sm text-white transition hover:bg-gray-700 w-full rounded-md">
                  <AiOutlineShoppingCart className="mr-2 h-5 w-5" />
                  Add to cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SimilarProduct;
