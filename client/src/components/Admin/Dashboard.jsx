import React, { useEffect, useState } from 'react';

// Animated Bar Chart component
const BarChart = ({ data, color = "bg-blue-500" }) => {
  const max = Math.max(...data.map(d => d.value));
  const [heights, setHeights] = useState(data.map(() => 0));

  useEffect(() => {
    data.forEach((d, i) => {
      setTimeout(() => {
        setHeights(hs => {
          const newHeights = [...hs];
          newHeights[i] = (d.value / max) * 100;
          return newHeights;
        });
      }, 100 * i);
    });
  }, [data, max]);

  return (
    <div className="flex items-end gap-3 w-full h-full">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center flex-1">
          <div
            className={`transition-all duration-700 w-6 rounded-t ${color}`}
            style={{
              height: `${heights[i]}%`,
              minHeight: "40px",
            }}
            title={d.value}
          />
          <span className="mt-2 text-xs text-gray-600">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

const ChartCard = ({ title, data, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-md h-80 flex flex-col hover:shadow-lg transition">
    <h2 className="text-base text-gray-700 font-semibold mb-3">{title}</h2>
    <div className="flex-1 flex items-end justify-center">
      <BarChart data={data} color={color} />
    </div>
  </div>
);

const Card = ({ title, value, change }) => (
  <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition">
    <h2 className="text-sm text-gray-500 font-medium">{title}</h2>
    <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
    <p className="text-green-500 text-sm mt-1">{change}</p>
  </div>
);

const Dashboard = () => {
  const salesGrowthData = [
    { label: "A", value: 30 },
    { label: "B", value: 50 },
    { label: "C", value: 40 },
    { label: "D", value: 70 },
    { label: "E", value: 60 },
  ];
  const salesPerRepData = [
    { label: "Rep 1", value: 20 },
    { label: "Rep 2", value: 35 },
    { label: "Rep 3", value: 25 },
    { label: "Rep 4", value: 40 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Sales Dashboard</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <select className="p-3 rounded border text-sm bg-white shadow-sm">
          <option>This Month</option>
        </select>
        <select className="p-3 rounded border text-sm bg-white shadow-sm">
          <option>All Regions</option>
        </select>
        <select className="p-3 rounded border text-sm bg-white shadow-sm">
          <option>All Products</option>
        </select>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Accounts" value="2,104" change="+20%" />
        <Card title="Orders per Month" value="37" change="+15" />
        <Card title="Average Contract" value="$1,553" change="+7.3%" />
        <Card title="Growth Rate" value="8.29%" change="+1.3%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          title="Sales Growth by Market Segment"
          data={salesGrowthData}
          color="bg-blue-500"
        />
        <ChartCard
          title="Sales per Representative"
          data={salesPerRepData}
          color="bg-emerald-500"
        />
      </div>
    </div>
  );
};

export default Dashboard;
