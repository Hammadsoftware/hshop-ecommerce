import React from "react";
import {moreProducts} from "../Common/Data2";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

function MoreProducts() {
  return (
    <div className="lg:p-10 p-5">
      <h2 className="text-4xl text-center font-bold mb-4">Girls Collections</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        {moreProducts.map((product, index) => (
          <Link to={`/products/${product.id}`} key={index}>
            <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden bg-white shadow-md rounded-lg">
              <div className="relative flex h-80 w-full overflow-hidden">
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
                  <button className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700 rounded-full">
                    <AiOutlineHeart size={20} />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700 rounded-full">
                    <AiOutlineShoppingCart size={20} />
                  </button>
                </div>
              </div>
              <div className="mt-4 pb-5 text-center">
                <h5 className="tracking-tight text-gray-700 font-medium">{product.name}</h5>
                <div className="mt-2 flex justify-center space-x-2">
                  <span className="text-sm font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MoreProducts;
