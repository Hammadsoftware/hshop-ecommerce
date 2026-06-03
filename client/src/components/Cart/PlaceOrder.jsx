import React, { useState } from "react";
import axios from "axios";


const steps = [
  { label: "Address" },
  { label: "Complete" },
];

function PlaceOrder({userId}) {
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
   userId: userId,
    firstName: "",
    lastName: "",
    companyName: "",
    country: "Pakistan",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    // Validate required fields
    if (
      !form.firstName ||
      !form.lastName ||
      !form.addressLine1 ||
      !form.city ||
      !form.state ||
      !form.postalCode ||
      !form.phone
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/user/profile", form);
      console.log("Server response:", response.data);
      setStep(2);
      setCompleted(true);
    } catch (error) {
      console.error("Error submitting address:", error.response?.data || error.message);
      alert("Failed to submit address.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const progressPercent = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full flex flex-col items-center pt-8 px-2">
      <div className="w-full max-w-4xl mb-8">
        <div className="relative flex items-center justify-between mb-2">
          {steps.map((s, idx) => (
            <div key={s.label} className="flex-1 flex flex-col items-center z-10">
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full font-bold border-2
                  ${step > idx
                    ? "bg-green-600 text-white border-green-600"
                    : step === idx + 1
                    ? "bg-black text-white border-black"
                    : "bg-gray-200 text-gray-400 border-gray-300"}`}
              >
                {idx + 1}
              </div>
              <span className={`mt-2 text-xs font-medium ${step > idx ? "text-green-700" : step === idx + 1 ? "text-black" : "text-gray-400"}`}>
                {s.label}
              </span>
            </div>
          ))}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 z-0" style={{ transform: "translateY(-50%)" }}>
            <div className="h-1 bg-green-600 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-xl shadow p-8 border">
        {step === 1 && !completed && (
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">First Name</label>
                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Last Name</label>
                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Company Name</label>
              <input type="text" name="companyName" value={form.companyName} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Country</label>
              <select name="country" value={form.country} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                <option value="Pakistan">Pakistan</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Address Line 1</label>
              <input type="text" name="addressLine1" value={form.addressLine1} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
            </div>
            <div>
              <label className="block font-semibold mb-1">Address Line 2</label>
              <input type="text" name="addressLine2" value={form.addressLine2} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-1">City</label>
                <input type="text" name="city" value={form.city} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">State</label>
                <input type="text" name="state" value={form.state} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Postal Code</label>
                <input type="text" name="postalCode" value={form.postalCode} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Phone Number</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={handleBack} className="bg-gray-200 text-black px-8 py-2 rounded hover:bg-gray-300">
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className={`bg-black text-white px-8 py-2 rounded hover:bg-gray-800 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Next"}
              </button>
            </div>
          </form>
        )}

        {step === 2 && completed && (
          <>
            <div className="text-center py-12">
              <div className="text-5xl mb-4 text-green-600">✓</div>
              <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
              <p className="mb-4">
                Thank you, <span className="font-semibold">{form.firstName} {form.lastName}</span>.<br />
                Your order will be delivered to:
              </p>
              <div className="mb-2 text-gray-700">{form.addressLine1}, {form.addressLine2}</div>
              <div className="mb-2 text-gray-700">{form.city}, {form.state}, {form.country} - {form.postalCode}</div>
              <div className="mb-2 text-gray-700">Phone: {form.phone}</div>
            </div>
            
          </>
        )}
      </div>
    </div>
  );
}

export default PlaceOrder;
