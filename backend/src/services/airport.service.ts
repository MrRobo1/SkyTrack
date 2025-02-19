import { Airport } from "../entities/airport.entity";

export class AirportService {
    async getAllAirports(): Promise<Airport []> {
            try {
                return await Airport.find();
            } catch (error) {
                console.error("Error while getting all airports:", error);
                throw new Error("Error while getting all airports");
            }
        }
}