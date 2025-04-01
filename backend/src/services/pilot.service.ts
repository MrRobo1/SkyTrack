import { InputPilotLogin } from "inputs/inputPilotLogin";
import { Pilot } from "../entities/pilot.entity";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

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

    async loginPilot(loginData: InputPilotLogin): Promise<{ token: string; pilot: Pilot }> {
        const { email, password } = loginData;

        try {
            const existingPilot = await Pilot.findOne({
                where: { email }
            });
            if (!existingPilot) {
                throw new Error("Invalid credentials");
            }

            const isPasswordValid = await argon2.verify(existingPilot.password, password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }

            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw new Error("JWT_SECRET is not defined");
            }

            const token = jwt.sign(
                { id: existingPilot.id},
                jwtSecret
            );

            return { token, pilot: existingPilot };
        } catch (error) {
            console.error("Error during login:", error);
            throw new Error("Login failed");
        }
    }
}