"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface FlightsLineChartProps {
  data: Array<{ name: string; flights: number }>;
}

export default function FlightsLineChart({ data }: FlightsLineChartProps) {
  return (
    <div className="bg-sky-50 shadow-md rounded-md p-6 w-full">
      <h2 className="mb-4 text-lg font-bold text-black">
        Flights per day (current week)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="flights"
            stroke="#3b82f6"
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
