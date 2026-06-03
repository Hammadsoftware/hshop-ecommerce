import React from 'react';
import { FaTimes, FaTrashAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../../redux/cartSlice';

function Cartdrawer({ isOpen, onClose }) {
  const dispatch = useDispatch();

  // Get items from Redux store and ensure it's an array
  const rawItems = useSelector((state) => state.cart.items);
  const items = Array.isArray(rawItems) ? rawItems : [];

  // Parse string prices to numbers and calculate total
  const total = items.length > 0
    ? items.reduce((sum, item) => {
        const price = typeof item.price === 'string'
          ? parseFloat(item.price.replace('$', '')) || 0
          : item.price || 0;
        const quantity = item.quantity || 1;
        return sum + price * quantity;
      }, 0)
    : 0;

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full lg:w-80 bg-white shadow-lg z-50 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button onClick={onClose} className="text-gray-800 text-2xl hover:text-gray-600">
          <FaTimes />
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-4 overflow-y-auto h-[70%]">
        {items.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">Your cart is empty.</div>
        ) : (
          items.map((item ,index) => {
            const price = typeof item.price === 'string'
              ? parseFloat(item.price.replace('$', '')) || 0
              : item.price || 0;
            const quantity = item.quantity || 1;
            const subtotal = price * quantity;

            return (
              <div
                key={index}
                className="flex gap-4 border rounded-lg p-3 bg-white shadow-md relative"
              >
                <img
                  src={item.image || 'https://via.placeholder.com/80'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex flex-col flex-grow">
                  <span className="font-semibold text-lg">{item.name}</span>
                  <span className="text-sm text-gray-600">Price: ${price}</span>
                  <span className="text-sm text-gray-600">Qty: {quantity}</span>
                  <span className="text-sm font-medium text-black">
                    Subtotal: ${subtotal.toFixed(2)}
                  </span>
                </div>
                <button
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  <FaTrashAlt />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Checkout */}
      <div className="p-4 border-t">
        <div className="flex justify-between mb-2 text-lg font-semibold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="w-full bg-black text-white py-2 rounded-md hover:bg-red-600">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cartdrawer;
