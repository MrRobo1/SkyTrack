"use client";
import MyFlightCard from "@/app/ui/myflight/myFlightCard";
import { useQuery } from "@apollo/client";
import { GET_ALL_FLIGHTS } from "@/app/lib/graphql/queries";

export default function Page() {
  const { loading, error, data } = useQuery(GET_ALL_FLIGHTS);

  if (loading) return <p>Loading flight</p>;
  if (error) return <p>Error loading flight: {error.message}</p>;
  if (!data || !data.getAllFlights) {
    return <p>No flight found</p>;
  }

  const flight = data.getAllFlights;

  return (
    <div className="min-h-screen flex flex-wrap gap-6 justify-center items-start p-6">
      {flight.map(
        (
          flight: {
            airplane: { airplane_name: string };
            departure_airport: { code_ICAO: string };
            arrival_airport: { code_ICAO: string };
            distance: number;
            departure_time: string;
            arrival_time: string;
          },
          idx: number
        ) => {
          const dep = new Date(flight.departure_time);
          const arr = new Date(flight.arrival_time);
          const diffMs = arr.getTime() - dep.getTime();
          const diffHours = diffMs / (1000 * 60 * 60);
          const roundedHours = Math.round(diffHours * 10) / 10;

          return (
            <MyFlightCard
              key={idx}
              airplaneName={flight.airplane.airplane_name}
              departure={flight.departure_airport.code_ICAO}
              arrival={flight.arrival_airport.code_ICAO}
              distance={flight.distance}
              duration={`${roundedHours}h`}
            />
          );
        }
      )}
    </div>
  );
}
