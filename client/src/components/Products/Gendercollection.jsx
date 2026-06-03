import React from 'react';
import Men from "../../assets/Men.png"; // Import the image
import Women from "../../assets/Women.png"; // Import the second image

function Gendercollection() {
  return (
    <div className="grid  grid-cols-1 md:grid-cols-2  gap-3 p-10">
      {/* First Div */}
      <div
        className="relative lg:ml-10 bg-cover bg-center w-[300px] h-[300px]  lg:w-[700px] lg:h-[600px]   flex items-center justify-center"
        style={{
          backgroundImage: `url(${Men})`, // Correctly set the background image
        }}
      >
        <button className="absolute bottom-6 bg-white text-black px-6 py-2 rounded-md shadow-md hover:bg-gray-200">
          Shop Men's Collection
        </button>
      </div>

      {/* Second Div */}
      <div
        className="relative lg:ml-10 bg-cover bg-center w-[300px] h-[300px]  lg:w-[700px] lg:h-[600px]   flex items-center justify-center"
        style={{
          backgroundImage: `url(${Women})`, // Correctly set the background image
        }}
      >
        <button className="absolute bottom-6 bg-white text-black px-6 py-2 rounded-md shadow-md hover:bg-gray-200">
          Shop Women's Collection
        </button>
      </div>
    </div>
  );
}

export default Gendercollection;