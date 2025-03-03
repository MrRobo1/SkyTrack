interface DashboardCardProps {
  flightNumber: number;
  distance: number;
  hours: number;
}
export default function DashboardStatCard({
  flightNumber,
  distance,
  hours,
}: DashboardCardProps) {
  return (
    <div className="bg-white shadow-md rounded-md p-6 space-y-4">
      <h2 className="text-lg font-bold text-black">Stat</h2>
      <div className="flex justify-between text-gray-600 mb-2">
        <div className="flex flex-col">
          <span className="font-medium">Total Flight</span>
          <span className="text-sm">&nbsp;</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium">Distance</span>
          <span className="text-sm">&nbsp;</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium">Hours</span>
          <span className="text-sm">&nbsp;</span>
        </div>
      </div>

      <hr className="border-gray-400 mb-2" />

      <div className="flex justify-between text-gray-700">
        <div className="text-lg font-semibold">{flightNumber}</div>
        <div className="text-lg font-semibold">{distance} Nm</div>
        <div className="text-lg font-semibold">{hours}</div>
      </div>
    </div>
  );
}
