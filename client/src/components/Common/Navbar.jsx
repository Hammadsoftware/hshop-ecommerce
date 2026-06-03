import React, { useState } from 'react';
import {
  FaSearch,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaUserCircle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Search from '../Common/Search';
import Cartdrawer from '../Layout/Cartdrawer';

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Get cart items from Redux
  const cartItems = useSelector((state) => state.cart.items || []);
  const totalCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  // Get user from Redux
  const user = useSelector((state) => state.user.user);

  // Get first letter of email (or fallback)
  const userInitial =
    user && user.email ? user.email.charAt(0).toUpperCase() : <FaUserCircle />;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-opacity-90 backdrop-blur-md text-white px-4 py-3 flex justify-between items-center lg:rounded-b-none rounded-b-xl shadow-lg">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/">H-Shop</a>
        </div>

        {/* Right-side icons and Hamburger */}
        <div className="flex items-center  gap-4 ml-auto">
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex gap-6  text-lg">
            <Link to="/" className="font-semibold hover:text-gray-200">Home</Link>
            <Link to="/product" className="font-semibold hover:text-gray-200">Product</Link>
         
            <Link to="/cart" className="font-semibold hover:text-gray-200">Cart</Link>
          </div>

          {/* User Profile */}
          <Link to="/profile" className="text-xl hover:text-gray-200 hidden lg:block">
            <span className="flex items-center justify-center w-8 h-8 bg-white text-blue-600 rounded-full font-bold text-lg">
              {user && user.email ? user.email.charAt(0).toUpperCase() : <FaUserCircle />}
            </span>
          </Link>

          {/* Cart Icon with badge */}
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-white text-xl hover:text-gray-200 flex items-center gap-2 relative"
            >
              <FaShoppingCart />
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>
          </div>

          {/* Search Button */}
          <button
            onClick={() => setShowSearch(true)}
            className="text-xl hover:text-gray-200"
          >
            <FaSearch />
          </button>

          {/* Hamburger Menu (Mobile) */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-2xl focus:outline-none"
            >
              {showMenu ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {showMenu && (
        <div className="fixed top-[60px] left-0 w-full bg-white text-gray-800 shadow-lg flex flex-col items-center py-4 gap-4 z-40 lg:hidden animate-slide-down">
          <Link to="/" className="font-semibold" onClick={() => setShowMenu(false)}>Home</Link>
          <Link to="/product" className="font-semibold" onClick={() => setShowMenu(false)}>Product</Link>
        

          <Link to="/cart" className="font-semibold" onClick={() => setShowMenu(false)}>Cart</Link>
          <Link to="/profile" className="font-semibold flex items-center gap-2" onClick={() => setShowMenu(false)}>
            <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-lg">
              {user && user.email ? user.email.charAt(0).toUpperCase() : <FaUserCircle />}
            </span>
            Profile
          </Link>
        </div>
      )}

      {/* Conditional Components */}
      {showSearch && <Search onClose={() => setShowSearch(false)} />}
      <Cartdrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Navbar;