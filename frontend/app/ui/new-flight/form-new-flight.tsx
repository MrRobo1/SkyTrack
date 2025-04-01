"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/app/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/ui/form";
import { Input } from "@/app/ui/input";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_AIRPLANES, GET_ALL_AIRPORTS } from "@/app/lib/graphql/queries";
import { CREATE_FLIGHT_MUTATION } from "@/app/lib/graphql/mutations";

// ---------------------------------------------
// 1. Définir le schéma Zod pour les champs
// ---------------------------------------------
const createFlightSchema = z.object({
  airplaneId: z.string().nonempty("Please select an airplane"),
  departure_airport: z.string().nonempty("Please select a departure airport"),
  arrival_airport: z.string().nonempty("Please select an arrival airport"),
  distance: z.number().min(1, "Distance must be at least 1"),
  departure_time: z.string().nonempty("Please enter departure date/time"),
  arrival_time: z.string().nonempty("Please enter arrival date/time"),
  number_of_passangers: z.number().min(0, "Passengers cannot be negative"),
  fuel_quantity: z.number().min(0, "Fuel cannot be negative"),
  comment: z.string().optional(),
});

// On infère le type TypeScript depuis le schéma Zod
type CreateFlightFormValues = z.infer<typeof createFlightSchema>;

export default function CreateFlightForm() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [createFlight, { loading: creatingFlight }] = useMutation(
    CREATE_FLIGHT_MUTATION
  );

  // ---------------------------------------------
  // 3. React Hook Form
  // ---------------------------------------------
  const form = useForm<CreateFlightFormValues>({
    resolver: zodResolver(createFlightSchema),
    defaultValues: {
      airplaneId: "",
      departure_airport: "",
      arrival_airport: "",
      distance: 0,
      departure_time: "",
      arrival_time: "",
      number_of_passangers: 0,
      fuel_quantity: 0,
      comment: "",
    },
  });

  // ---------------------------------------------
  // 4. Récupération des listes avion/aéroport
  // ---------------------------------------------
  const {
    data: airplanesData,
    loading: airplanesLoading,
    error: airplanesError,
  } = useQuery(GET_ALL_AIRPLANES);

  const {
    data: airportsData,
    loading: airportsLoading,
    error: airportsError,
  } = useQuery(GET_ALL_AIRPORTS);
  // ---------------------------------------------
  // 5. Soumission du formulaire
  // ---------------------------------------------
  async function onSubmit(values: CreateFlightFormValues) {
    setLoading(true);
    setErrorMsg(null);

    try {
      const departureStr = values.departure_time;
      const departureWithSeconds = departureStr + ":00";
      const departureDate = new Date(departureWithSeconds);
      const departureISO = departureDate.toISOString();

      const arrivalStr = values.arrival_time;
      const arrivalWithSeconds = arrivalStr + ":00";
      const arrivalDate = new Date(arrivalWithSeconds);
      const arrivalISO = arrivalDate.toISOString();

      const result = await createFlight({
        variables: {
          data: {
            airplaneId: parseInt(values.airplaneId, 10),
            departure_airport: parseInt(values.departure_airport, 10),
            arrival_airport: parseInt(values.arrival_airport, 10),
            distance: values.distance,
            departure_time: departureISO, // string, le backend le convertira en Date
            arrival_time: arrivalISO,
            number_of_passangers: values.number_of_passangers,
            fuel_quantity: values.fuel_quantity,
            comment: values.comment || "",
          },
        },
      });

      const flight = result.data?.createFlight;
      console.log("Flight created:", flight);

      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating flight:", error);
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  if (airplanesLoading || airportsLoading) {
    return <p>Loading data...</p>;
  }

  if (airplanesError || airportsError) {
    return <p>Error loading airplanes or airports.</p>;
  }

  const airplanes = airplanesData?.getAllAirplane || [];
  const airports = airportsData?.getAllAirports || [];

  // ---------------------------------------------
  // 6. Rendu du formulaire
  // ---------------------------------------------
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create a new flight</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Airplane */}
          <FormField
            control={form.control}
            name="airplaneId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Airplane</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="border rounded px-2 py-1 w-full"
                  >
                    <option value="">-- Select an airplane --</option>
                    {airplanes.map(
                      (plane: { id: number; airplane_name: string }) => (
                        <option key={plane.id} value={plane.id}>
                          {plane.airplane_name}
                        </option>
                      )
                    )}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Departure Airport */}
          <FormField
            control={form.control}
            name="departure_airport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departure Airport</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="border rounded px-2 py-1 w-full"
                  >
                    <option value="">-- Select a departure airport --</option>
                    {airports.map(
                      (apt: {
                        id: number;
                        airport_name: string;
                        code_ICAO: string;
                      }) => (
                        <option key={apt.id} value={apt.id}>
                          {apt.airport_name} ({apt.code_ICAO})
                        </option>
                      )
                    )}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Arrival Airport */}
          <FormField
            control={form.control}
            name="arrival_airport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Arrival Airport</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="border rounded px-2 py-1 w-full"
                  >
                    <option value="">-- Select an arrival airport --</option>
                    {airports.map(
                      (apt: {
                        id: number;
                        airport_name: string;
                        code_ICAO: string;
                      }) => (
                        <option key={apt.id} value={apt.id}>
                          {apt.airport_name} ({apt.code_ICAO})
                        </option>
                      )
                    )}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Distance */}
          <FormField
            control={form.control}
            name="distance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distance (in NM or km)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter flight distance"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Departure time */}
          <FormField
            control={form.control}
            name="departure_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departure Date/Time</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    placeholder="Select date & time"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Arrival time */}
          <FormField
            control={form.control}
            name="arrival_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Arrival Date/Time</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    placeholder="Select date & time"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Number of passengers */}
          <FormField
            control={form.control}
            name="number_of_passangers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Passengers</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter passenger count"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fuel quantity */}
          <FormField
            control={form.control}
            name="fuel_quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter fuel quantity"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Comment */}
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment (optional)</FormLabel>
                <FormControl>
                  <textarea
                    className="border rounded px-2 py-1 w-full"
                    rows={3}
                    placeholder="Any special remarks?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Erreur éventuelle */}
          {errorMsg && <p className="text-red-500">Error: {errorMsg}</p>}

          {/* Submit button */}
          <div className="flex gap-4">
            <Button type="submit" variant="outline" disabled={loading}>
              {creatingFlight ? "Creating flight..." : "Create Flight"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
