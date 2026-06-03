import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Suit from '../../assets/Suit.jpeg'; // Corrected import path
import jaket from '../../assets/jaket.jpeg'; 
import outfits from '../../assets/outfits.jpeg'; 
import perse from '../../assets/perse.jpeg'; 
import shoes from '../../assets/shoes.jpeg'; 
function AutoPlayMethods() {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4, // Default: Show 5 slides on larger screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // For screens <= 768px (mobile devices)
        settings: {
          slidesToShow: 1, // Show 1 slide at a time
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className=" slider-container p-10">
      <div className="flex justify-center items-center flex-col mb-6 lg:p-10 p-3">
        <h2 className="lg:text-7xl text-3xl text-center font-bold p-4">Discover New Arrivals</h2>
        <p className="text-center text-xl">
          Discover the latest trends and styles with our new arrivals.
        </p>
      </div>

      <Slider ref={sliderRef} {...settings}>
  {[  // Array of card data
    { image: Suit, title: "Suits" },
    { image: jaket, title: "Jakets" },
    { image: outfits, title: "Outfits" },
    { image: perse, title: "Handbags" },
    { image: shoes, title: "Shoes" },
  ].map((item, index) => (
    <div key={index} className="flex justify-center items-center relative w-full overflow-hidden rounded-lg">
      <img src={item.image} alt={item.title} className="w-96 h-[500px] rounded-lg shadow-lg" />
      <div className="w-96 h-24 bg-gradient-to-t from-black to-transparent absolute bottom-0 left-0 flex justify-start items-end p-5">
        <h1 className="text-white font-serif text-2xl">{item.title}</h1>
      </div>
    </div>
  ))}
</Slider>


      <div className="flex justify-end items-center mt-4 gap-4">
        <button
          className="bg-white border rounded w-10 h-10 flex justify-center items-center hover:bg-gray-200"
          onClick={scrollLeft}
        >
          <FaArrowLeft />
        </button>
        <button
          className="bg-white border rounded w-10 h-10 flex justify-center items-center hover:bg-gray-200"
          onClick={scrollRight}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default AutoPlayMethods;