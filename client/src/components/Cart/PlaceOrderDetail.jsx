import React from "react";

const statusSteps = ["Placed", "Paid", "Packed", "Shipped", "Delivered"];

function OrderProgress({ currentStatus }) {
  const currentStep = statusSteps.findIndex((step) => step === currentStatus);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        {statusSteps.map((step, index) => (
          <div key={step} className="flex-1 text-center text-xs">
            <div
              className={`w-6 h-6 mx-auto rounded-full border-2 ${
                index <= currentStep
                  ? "bg-green-600 border-green-600 text-white"
                  : "bg-gray-200 border-gray-300 text-gray-500"
              } flex items-center justify-center`}
            >
              {index + 1}
            </div>
            <p className="mt-1">{step}</p>
          </div>
        ))}
      </div>
      <div className="relative w-full h-2 bg-gray-200 rounded">
        <div
          className="absolute top-0 left-0 h-2 bg-green-600 rounded"
          style={{
            width: `${(currentStep / (statusSteps.length - 1)) * 100}%`,
            transition: "width 0.3s",
          }}
        ></div>
      </div>
    </div>
  );
}

// UI Only Example
function PlaceOrderDetailUI() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="bg-white rounded-xl shadow p-6">
        <OrderProgress currentStatus="Packed" />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Account Details */}
        <div className="bg-gray-100 rounded-xl shadow p-6 flex-1 min-w-[250px]">
          <h2 className="text-lg font-semibold mb-2">Your Account Details</h2>
          <div className="space-y-1 text-sm">
            <div>
              <span className="font-medium">Name:</span> John Doe
            </div>
            <div>
              <span className="font-medium">Email:</span> john@example.com
            </div>
            <div>
              <span className="font-medium">Phone:</span> +1234567890
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-xl shadow p-6 flex-[2] overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4">Product Details</h2>
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
              <tr className="border-b border-gray-200">
                <td className="p-3">
                  <img
                    src="/images/sample-product.jpg"
                    alt="Sample Product"
                    className="w-12 h-12 object-cover rounded shadow"
                  />
                </td>
                <td className="p-3">Sample Product</td>
                <td className="p-3">$100</td>
                <td className="p-3">2</td>
                <td className="p-3 font-semibold">$200.00</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3">
                  <img
                    src="/images/sample-product2.jpg"
                    alt="Sample Product 2"
                    className="w-12 h-12 object-cover rounded shadow"
                  />
                </td>
                <td className="p-3">Sample Product 2</td>
                <td className="p-3">$50</td>
                <td className="p-3">1</td>
                <td className="p-3 font-semibold">$50.00</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className="text-right font-bold p-3">
                  Total:
                </td>
                <td className="font-bold p-3">$250.00</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderDetailUI;