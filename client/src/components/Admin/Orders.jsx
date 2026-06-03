import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@components/Common/Loader";

const Orders = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/cart/getCart", {
          withCredentials: true,
        });
        setCartData(res.data.carts || []);
      } catch (error) {
        console.error("Failed to load orders:", error);
        setCartData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  if (loading) return <div className=""><Loader/></div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Customer Orders</h2>

      {cartData.length === 0 ? (
        <div className="text-gray-500 text-center">No orders found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-3 text-left border-b">User</th>
                <th className="p-3 text-left border-b">Products</th>
                <th className="p-3 text-left border-b">Total</th>
                <th className="p-3 text-left border-b">Order Date</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {cartData.map((cart) => (
                <tr key={cart._id} className="hover:bg-gray-50 transition">
                  {/* User Info */}
                  <td className="p-4 border-b">
                    <p className="font-medium">{cart.userId?.name || "Unknown User"}</p>
                    <p className="text-xs text-gray-500">{cart.userId?.email || "No Email"}</p>
                  </td>

                  {/* Product Info */}
                  <td className="p-4 border-b">
                    <ul className="space-y-4">
                      {cart.products.map((prod, idx) => {
                        const product = prod.productId;
                        return (
                          <li key={idx} className="flex items-start gap-4">
                            {product?.image && (
                              <img
                                src={product.image}
                                alt="product"
                                className="w-16 h-16 object-cover border rounded"
                              />
                            )}
                            <div>
                              <p className="font-semibold">
                                {product?.title || "Unknown Product"}
                              </p>
                              <p className="text-sm text-gray-600">
                                Quantity: {prod.quantity || 1}
                              </p>
                              <p className="text-sm text-gray-600">
                                Size: {prod.size}, Color: {prod.color}
                              </p>
                              <p className="text-sm text-gray-600">
                                Price: ${product?.price || prod.price}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </td>

                  {/* Total */}
                  <td className="p-4 border-b font-semibold text-green-600">
                    ${cart.totalPrice.toFixed(2)}
                  </td>

                  {/* Date */}
                  <td className="p-4 border-b text-gray-500 text-sm">
                    {new Date(cart.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
