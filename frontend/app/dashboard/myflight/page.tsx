"use client";

import { useQuery } from "@apollo/client";
import { GET_ALL_FLIGHTS } from "@/app/lib/graphql/queries";
import { columns, FlightRow } from "./columns";
import { DataTable } from "./data-table";

type GqlFlight = {
  airplane?: { airplane_name?: string } | null;
  departure_airport?: { code_ICAO?: string } | null;
  arrival_airport?: { code_ICAO?: string } | null;
  fuel_quantity?: number | null;
  number_of_passangers?: number | null;
  distance?: number | null;
};

export default function Page() {
  const { loading, error, data } = useQuery(GET_ALL_FLIGHTS);

  if (loading) return <p className="p-4">Loading flights…</p>;
  if (error)
    return <p className="p-4">Error loading flights: {error.message}</p>;
  if (!data || !data.getAllFlights)
    return <p className="p-4">No flights found</p>;

  const flights = (data.getAllFlights as GqlFlight[]) ?? [];

  const rows: FlightRow[] = flights.map((f) => ({
    airplane: f.airplane?.airplane_name ?? "-",
    route: `${f.departure_airport?.code_ICAO ?? "-"} → ${f.arrival_airport?.code_ICAO ?? "-"}`,
    fuel: typeof f.fuel_quantity === "number" ? f.fuel_quantity : null,
    passenger:
      typeof f.number_of_passangers === "number"
        ? f.number_of_passangers
        : null,
    distance: Number(f.distance ?? 0),
  }));

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
