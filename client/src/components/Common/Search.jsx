import React from 'react';
import { FaTimes, FaSearch } from 'react-icons/fa';

function Search({ onClose }) {
    return (
        <div className="absolute h-[140px]  lg:h-[120px] top-0 left-0 w-full bg-white z-50 flex items-center justify-between p-4 shadow-md ">
            {/* Search Input */}
            <div className='w-full flex justify-baseline pl-10 items-center gap-3 '>
                <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full lg:w-1/2  p-2 border bg-gray-300 border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />

                <button className='text-3xl'>  < FaSearch/></button>


            </div>

            {/* Close Button */}
            <button
                onClick={onClose}
                className="text-gray-800 text-2xl  hover:text-gray-600  pl-30"
            >
                <FaTimes />
            </button>
        </div>
    );
}

export default Search;