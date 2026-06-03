import React from 'react';
import { FaLock, FaGlobeAmericas, FaHandshake } from 'react-icons/fa';

function TrustSection() {
  const cards = [
    {
      icon: <FaLock className="text-4xl group-hover:text-white transition" />,
      title: "Secure Checkout",
      desc: "100% secure and encrypted transactions for peace of mind.",
    },
    {
      icon: <FaGlobeAmericas className="text-4xl group-hover:text-white transition" />,
      title: "Customers Worldwide",
      desc: "Shoppers from 150+ countries trust us for fast, reliable delivery.",
    },
    {
      icon: <FaHandshake className="text-4xl group-hover:text-white transition" />,
      title: "Brand Collaborations",
      desc: "Partnered with premium brands for exclusive styles and quality.",
    },
  ];

  return (
    <div className="bg-white py-20 px-4 lg:px-20">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-4xl font-extrabold text-black mb-2">
          Why Shop With Us?
        </h2>
        <p className="text-gray-600 text-lg">
          Trusted globally. Partnered locally. Delivered securely.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group bg-white border border-black text-black rounded-2xl shadow-md hover:bg-black hover:text-white transition-all duration-300 p-8 text-center"
          >
            <div className="mb-4">{card.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
            <p className="text-sm opacity-90">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrustSection;
