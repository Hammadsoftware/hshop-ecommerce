import React from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { Globe } from '@components/magicui/globe';

function FastDelivery() {
  return (
    <div className="relative bg-gray-100 min-h-screen px-6 lg:px-20 py-16 flex flex-col justify-center items-center text-center overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col items-center justify-center relative z-10">
        {/* Top Text */}
        <div className="mb-10">
          <FaShippingFast className="text-6xl text-black mx-auto mb-4" />
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
            Fast Delivery, Everywhere
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            We deliver across the globe, quickly and reliably — so you get what you need, when you need it.
          </p>
        </div>

        {/* Globe */}
        <div className="w-full max-w-[600px] aspect-square relative z-10">
          <Globe className="absolute inset-0 w-full h-full" />
        </div>

        {/* Bottom Text */}
        <div className="mt-12 text-2xl lg:text-3xl font-bold text-gray-800 max-w-2xl">
          Shipping Worldwide — Fast, Reliable, and Right to Your Doorstep!
        </div>
      </div>
    </div>
  );
}

export default FastDelivery;
