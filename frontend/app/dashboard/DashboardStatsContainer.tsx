"use client";

import { useQuery } from "@apollo/client";
import { GET_ALL_FLIGHTS } from "@/app/lib/graphql/queries";
import DashboardStatCard from "@/app/ui/dashboard/dashboard-stat-card";

export default function DashboardStatsContainer() {
  const { data, loading, error } = useQuery(GET_ALL_FLIGHTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.getAllFlights) {
    return <p>No data returned</p>;
  }

  const flights = data?.getAllFlights || [];
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
  return (
    <DashboardStatCard
      flightNumber={flightNumber}
      distance={totalDistance}
      hours={roundedHours}
    />
  );
}
