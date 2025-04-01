import { Airplane } from "../entities/airplane.entity";

export class AirplaneService {
    async getAllAirplane(): Promise<Airplane []> {
            try {
                return await Airplane.find();
            } catch (error) {
                console.error("Error while getting all airplanes:", error);
                throw new Error("Error while getting all airplanes");
            }
        }
}