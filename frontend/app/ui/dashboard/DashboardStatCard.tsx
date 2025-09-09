import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DashboardPieChartProps {
  flightNumber: number;
  distance: number;
  hours: number;
}
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function DashboardPieChart({
  flightNumber,
  distance,
  hours,
}: DashboardPieChartProps) {
  const data = [
    { name: "Distance (NM)", value: distance },
    { name: "Hours", value: hours },
    { name: "Flights", value: flightNumber },
  ];

  return (
    <div className="bg-sky-50 shadow-md rounded-md p-6 space-y-4 w-full max-w-xl">
      <h2 className="text-lg font-bold text-black mb-4">Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
