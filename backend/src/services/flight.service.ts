import { Flight } from "../entities/flight.entity";
import { Airplane } from "../entities/airplane.entity";
import { Airport } from "../entities/airport.entity";
import { Pilot } from "../entities/pilot.entity";
import { CreateFlightInput } from "../inputs/createFlightInput";
import { UpdateFlightInput } from "../inputs/updateFlightInput";

export class FlightService {
    async getAllFlight(): Promise<Flight []> {
            try {
                return await Flight.find({
                    relations: {
                        airplane: true,
                        departure_airport: true,
                        arrival_airport: true,
                        pilot: true,
                    },
                });
            } catch (error) {
                console.error("Error while getting all flights:", error);
                throw new Error("Error while getting all flights");
            }
    }

    async createFlight(pilotId: number, data: CreateFlightInput): Promise<Flight> {
        const pilot = await Pilot.findOne({ where: { id: pilotId } });
        if (!pilot) {
            throw new Error("Pilot not found");
        }

        const airplane = await Airplane.findOne({ where: { id: data.airplaneId } });
        if (!airplane) {
            throw new Error("Airplane not found");
        }

        const departureAirport = await Airport.findOne({ where: { id: data.departure_airport } });
        if (!departureAirport) {
            throw new Error("Departure airport not found");
        }

        const arrivalAirport = await Airport.findOne({ where: { id: data.arrival_airport } });
        if (!arrivalAirport) {
            throw new Error("Arrival airport not found");
        }

        const flight = Flight.create({
            pilot,
            airplane,
            departure_airport: departureAirport,
            arrival_airport: arrivalAirport,
            distance: data.distance,
            departure_time: data.departure_time,
            arrival_time: data.arrival_time,
            number_of_passangers: data.number_of_passangers,
            fuel_quantity: data.fuel_quantity,
            comment: data.comment,
        });

        await flight.save();
        return flight;
    }

    async getLastFlight(): Promise<Flight | null> {
        try {
            const [flight] = await Flight.find({
                order: { id: "DESC" },
                relations: {
                    airplane: true,
                    departure_airport: true,
                    arrival_airport: true,
                },
                take: 1,
            })
            return flight || null;
        } catch (error) {
            console.error("Error while getting last flight:", error);
            throw new Error("Error while getting last flights");
        }
    }

    async updateFlight(id: number, data: UpdateFlightInput): Promise<Flight> {
      const flight = await Flight.findOne({ where: { id } });
      if (!flight) {
        throw new Error("Flight not found");
      }

      if (typeof data.distance === "number") {
        flight.distance = data.distance;
      }
      if (typeof data.number_of_passangers === "number") {
        flight.number_of_passangers = data.number_of_passangers;
      }
      if (typeof data.fuel_quantity === "number") {
        flight.fuel_quantity = data.fuel_quantity;
      }

      await flight.save();

      const updated = await Flight.findOne({
        where: { id: flight.id },
        relations: {
          airplane: true,
          departure_airport: true,
          arrival_airport: true,
          pilot: true,
        },
      });

      return updated ?? flight;
    }
}