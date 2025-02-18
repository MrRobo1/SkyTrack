import { Flight } from "../entities/flight.entity";

export class FlightService {
    async getAllFlight(): Promise<Flight []> {
            try {
                return await Flight.find();
            } catch (error) {
                console.error("Error while getting all flights:", error);
                throw new Error("Error while getting all flights");
            }
        }
}