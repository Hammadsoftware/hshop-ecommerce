import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Newsletter</h2>
          <p className="text-gray-600 mb-2">
            Be the first to hear about new products, exclusive events, and online offers.
          </p>
          <p className="text-gray-600 mb-6">
            Sign up and get 10% off your first order.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <button className="px-6 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Links Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Shop Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shop</h3>
            <ul className="space-y-3">
              {["Men's Top Wear", "Women's Top Wear", "Men's Bottom Wear", "Women's Bottom Wear"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              {["Contact Us", "About Us", "FAQs", "Features"].map((item) => (
                <li key={item}>
                  <Link to={"/"} className="text-gray-600 hover:text-gray-900 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <FaYoutube className="w-5 h-5" />
                </a>
              </div>
              <div>
                <p className="text-gray-600">Call Us</p>
                <p className="text-gray-900 font-bold">+92-336-5034-779</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;