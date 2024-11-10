import { Pilot } from "../entities/pilot.entity";

export class PilotService {
    async getAllPilots(): Promise<Pilot []> {
        try {
            return await Pilot.find();
        } catch (error) {
            console.error("Error while getting all pilots:", error);
            throw new Error("Error while getting all pilots");
        }
    }

    async getPilotByEmail(email:string): Promise<Pilot | null> {
        try {
            const pilot = await Pilot.findOne({ where: { email } });
            return pilot;
        } catch (error) {
            console.error("Error while fetching pilot by email:", error);
            throw new Error("Error while fetching pilot");
        }
    }
}