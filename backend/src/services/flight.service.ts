import { Flight } from "../entities/flight.entity";
import { Airplane } from "../entities/airplane.entity";
import { Airport } from "../entities/airport.entity";
import { Pilot } from "../entities/pilot.entity";
import { CreateFlightInput } from "../inputs/createFlightInput";

export class FlightService {
    async getAllFlight(): Promise<Flight []> {
            try {
                return await Flight.find();
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
}