import React, { useState } from "react";
import { useSelector } from "react-redux";
import PlaceOrder from "./PlaceOrder";
import OrderProgress from "./PlaceOrderDetail";
import axios from "axios";
import { toast } from "react-toastify";

function Checkout() {
  const rawItems = useSelector((state) => state.cart.items);
  const items = Array.isArray(rawItems) ? rawItems : [];
  const user = useSelector((state) => state.user.user);
const [userId,setUserId] = useState();

  const [showPlaceOrder, setShowPlaceOrder] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const total = items.reduce((sum, item) => {
    const price =
      typeof item.price === "string"
        ? parseFloat(item.price.replace("$", "")) || 0
        : item.price || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please log in to place an order.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/cart/add",
        {
          userId: user._id,
          products: items.map((item) => ({
            productId: item._id || item.id,
            quantity: item.quantity || 1,
            size: item.selectedSize || "M",
            color: item.selectedColor || "Default",
            price:
              typeof item.price === "string"
                ? parseFloat(item.price.replace("$", ""))
                : item.price,
            image: item.image,
          })),
          totalPrice: total,
        },
        { withCredentials: true }
      );
      

      if (res.status === 200 || res.status === 201) {
        toast.success("Order placed successfully!");
        setUserId(user._id);
        setShowPlaceOrder(true);
      } else {
        toast.error(res.data.message || "Failed to place order.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order.");
    }
  };

  const currentStatus = "Placed";

  return (
    <div className="min-h-screen bg-white pt-16 p-6 flex flex-col items-center justify-start">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Account Info */}
        <div className="bg-gray-100 rounded-2xl shadow p-6 md:col-span-1 text-black">
          <h2 className="text-xl font-semibold mb-4">Customer Info</h2>
          {user ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">Name: {user.name}</p>
              <p className="text-sm font-semibold">Email: {user.email}</p>
              <p className="text-sm font-semibold">Phone: {user.phone}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Please log in to see your account info.
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow p-6 md:col-span-2 text-black">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-200 text-black">
                <tr>
                  <th className="p-3">Image</th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 py-6">
                      Your cart is empty.
                    </td>
                  </tr>
                ) : (
                  items.map((item, idx) => (
                    <tr key={item.id || idx} className="border-b border-gray-200">
                      <td className="p-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded shadow"
                        />
                      </td>
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">
                        $
                        {typeof item.price === "string"
                          ? item.price.replace("$", "")
                          : item.price}
                      </td>
                      <td className="p-3">{item.quantity || 1}</td>
                      <td className="p-3 font-semibold">
                        $
                        {(
                          (typeof item.price === "string"
                            ? parseFloat(item.price.replace("$", "")) || 0
                            : item.price || 0) * (item.quantity || 1)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {items.length > 0 && (
                <tfoot>
                  <tr>
                    <td colSpan={4} className="text-right font-bold p-3">
                      Total:
                    </td>
                    <td className="font-bold p-3">${total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>

          {!showPlaceOrder && items.length > 0 && (
            <div className="flex justify-end mt-8">
              <button
                className="px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800 border border-gray-700 transition"
                onClick={handleAddToCart}
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>

      {showPlaceOrder && (
        <div className="w-full max-w-4xl mt-4">
          <PlaceOrder userId={userId}  onComplete={() => setShowProgress(true)}  />
          {showProgress && <OrderProgress currentStatus={currentStatus} />}
        </div>
      )}
    </div>
  );
}

export default Checkout
