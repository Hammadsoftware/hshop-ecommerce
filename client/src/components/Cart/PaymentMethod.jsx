import React, { useState } from "react";
import { FaMoneyBillWave, FaWallet } from "react-icons/fa";

function PaymentMethods({ form, setForm, handleNext, handleBack }) {
  const [method, setMethod] = useState("easypaisa");

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-300">
        <button
          className={`px-6 py-2 font-medium flex items-center ${
            method === "easypaisa" ? "border-b-2 border-green-500 text-black" : "text-gray-500"
          }`}
          onClick={() => {
            setMethod("easypaisa");
            setForm({ ...form, payment: "Easypaisa" });
          }}
        >
          <FaMoneyBillWave className="h-6 w-6" />
          <span className="ml-2">Easypaisa</span>
        </button>
        <button
          className={`ml-4 px-6 py-2 font-medium flex items-center ${
            method === "jazzcash" ? "border-b-2 border-green-500 text-black" : "text-gray-500"
          }`}
          onClick={() => {
            setMethod("jazzcash");
            setForm({ ...form, payment: "JazzCash" });
          }}
        >
          <FaWallet className="h-6 w-6" />
          <span className="ml-2">JazzCash</span>
        </button>
      </div>

      {/* Easypaisa or JazzCash Instructions */}
      <div className="bg-gray-50 border border-gray-200 rounded p-4 text-sm">
        {method === "easypaisa" ? (
          <div>
            <p className="mb-2">Please send the total amount to the following Easypaisa number:</p>
            <p className="font-semibold">0345-XXXXXXX</p>
            <p className="mt-2">After sending, note your Transaction ID and press "Pay Securely".</p>
          </div>
        ) : (
          <div>
            <p className="mb-2">Please send the total amount to the following JazzCash number:</p>
            <p className="font-semibold">0300-XXXXXXX</p>
            <p className="mt-2">After sending, note your Transaction ID and press "Pay Securely".</p>
          </div>
        )}
        <div className="mt-4">
          <label className="block font-semibold mb-1">Transaction ID</label>
          <input
            type="text"
            name="transactionId"
            value={form.transactionId || ""}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. TX12345XYZ"
            required
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          className="bg-gray-200 text-black px-8 py-2 rounded hover:bg-gray-300"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          type="button"
          className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
          onClick={handleNext}
          disabled={!form.transactionId}
        >
          Pay Securely
        </button>
      </div>
    </div>
  );
}

export default PaymentMethods;