import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function RevenueChart({ orders }) {

  const chartData = orders.map((order, index) => ({
    name: `Order ${index + 1}`,
    revenue: order.total || 0
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow border">

      <h2 className="text-lg font-semibold mb-4">
        Revenue Overview
      </h2>

      {chartData.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No revenue data yet
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>
      )}

    </div>
  );
}