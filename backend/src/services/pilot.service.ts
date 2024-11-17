import { Pilot } from "../entities/pilot.entity";
import * as argon2 from "argon2";

export class PilotService {
    async createPilot(pilotData: { name: string; email: string; password: string; avatar?: string}): Promise<Pilot> {
        const { name, email, password, avatar } = pilotData;
        try {
            const existingPilot = await Pilot.findOne({ where: { email }});
            if (existingPilot) {
                throw new Error("Pilot with this email already exists");
            }

            const hashedPassword = await argon2.hash(password);

            const newPilot = Pilot.create({
                name,
                email,
                password: hashedPassword,
                avatar,
            });
            return await newPilot.save();
        } catch (error) {
            console.error("Error while creating pilot:", error);
            throw new Error("Error while creating pilot");
        }
    }

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