"use client";

import { useQuery } from "@apollo/client";
import { GET_ALL_FLIGHTS } from "@/app/lib/graphql/queries";
import DashboardPieChart from "@/app/ui/dashboard/DashboardStatCard";
import FlightsLineChart from "@/app/ui/dashboard/FlightsLineChart";

function startOfThisWeek(d = new Date()) {
  const date = new Date(d);
  const day = date.getDay();
  const diffToMonday = (day + 6) % 7;
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - diffToMonday);
  return date;
}

function endOfThisWeek(d = new Date()) {
  const start = startOfThisWeek(d);
  const end = new Date(start);
  end.setDate(start.getDate() + 7);
  return end;
}

export default function DashboardStatsContainer() {
  const { data, loading, error } = useQuery(GET_ALL_FLIGHTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.getAllFlights) {
    return <p>No data returned</p>;
  }

  const flights: Array<{
    distance: number;
    departure_time: string;
    arrival_time: string;
  }> = data?.getAllFlights || [];

  const flightNumber = flights.length;

  const totalDistance = flights.reduce(
    (acc: number, flight: { distance: number }) => acc + flight.distance,
    0
  );

  const totalHours = flights.reduce(
    (acc: number, flight: { departure_time: string; arrival_time: string }) => {
      const dep = new Date(flight.departure_time);
      const arr = new Date(flight.arrival_time);

      const diffMs = arr.getTime() - dep.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      return acc + diffHours;
    },
    0
  );

  const roundedHours = Math.round(totalHours * 10) / 10;

  const weekStart = startOfThisWeek();
  const weekEnd = endOfThisWeek();

  const counts = Array(7).fill(0);

  for (const f of flights) {
    const dep = new Date(f.departure_time);
    if (dep >= weekStart && dep < weekEnd) {
      const jsDay = dep.getDay();
      const mondayIndex = (jsDay + 6) % 7;
      counts[mondayIndex] += 1;
    }
  }

  const labels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const lineData = labels.map((name, i) => ({ name, flights: counts[i] }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DashboardPieChart
        flightNumber={flightNumber}
        distance={totalDistance}
        hours={roundedHours}
      />
      <FlightsLineChart data={lineData} />
    </div>
  );
}
