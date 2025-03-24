"use client";

import { useQuery } from "@apollo/client";
import { GET_LAST_FLIGHT } from "@/app/lib/graphql/queries";
import LastFlightCard from "@/app/ui/dashboard/dashboard-lastFlight-card";

export default function LastFlightContainer() {
  const { loading, error, data } = useQuery(GET_LAST_FLIGHT);

  if (loading) return <p>Loading last flight...</p>;
  if (error) return <p>Error loading last flight: {error.message}</p>;
  if (!data || !data.getLastFlight) {
    return <p>No last flight found</p>;
  }

  const flight = data.getLastFlight;

  const dep = new Date(flight.departure_time);
  const arr = new Date(flight.arrival_time);
  const diffMs = arr.getTime() - dep.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  const roundedHours = Math.round(diffHours * 10) / 10;
  return (
    <LastFlightCard
      registration={flight.airplane.registration}
      departure={flight.departure_airport.code_ICAO}
      arrival={flight.arrival_airport.code_ICAO}
      distanceNm={flight.distance}
      flightTime={`${roundedHours}h`}
    />
  );
}
