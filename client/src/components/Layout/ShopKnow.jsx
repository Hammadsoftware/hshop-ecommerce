import React from 'react';
import { useNavigate } from 'react-router-dom';

function ShopKnow() {
  const navigate = useNavigate();

  return (
    <div className="w-full py-16 px-4 lg:px-20 flex items-center justify-center">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl rounded-lg overflow-hidden shadow-lg bg-emerald-100">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col items-start justify-center gap-5">
          <p className="text-lg text-center lg:text-left">Comfort and Style</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-center lg:text-left">Shop with Confidence</h1>
          <p className="text-base text-center lg:text-left text-gray-700">
            Discover the best products and enjoy a seamless shopping experience.
          </p>
          <button
            className="mt-2 w-40 bg-black hover:bg-gray-900 text-white py-2 rounded-md font-semibold"
            onClick={() => navigate('/product')}
          >
            Shop Now
          </button>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 h-[300px] lg:h-auto">
          <img
            src="/images/featured.webp"
            alt="featured"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
}

export default ShopKnow;