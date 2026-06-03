import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../../assets/Hero.png';

function Explore() {
  const navigate = useNavigate();

  return (
    <div
      className="relative bg-cover bg-center h-[650px] flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-50"></div>

      {/* Text Content */}
      <div className="relative z-10 text-white">
        <h2 className="text-7xl font-bold mb-4">Discover Our Latest Collection</h2>
        <p className="text-2xl font-bold mb-6">
          Explore a wide range of products tailored to your needs. Shop now and enjoy exclusive offers!
        </p>
        <button
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-red-600"
          onClick={() => navigate('/product')}
        >
          Explore Now
        </button>
      </div>
    </div>
  );
}

export default Explore;