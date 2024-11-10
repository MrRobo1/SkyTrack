import { Resolver, Query, Arg } from "type-graphql";
import { Pilot } from "../entities/pilot.entity";
import { PilotService } from "../services/pilot.service";

@Resolver(() => Pilot)
export default class PilotResolver {
    private pilotService = new PilotService();

    // Récupérer tous les pilotes
    @Query(() => [Pilot])
    async getAllPilots(): Promise<Pilot[]> {
        return this.pilotService.getAllPilots();
    }

    // Récuperer un pilot par email
    @Query(() => Pilot, { nullable: true })
    async getPilotByEmail(@Arg("email") email: string): Promise<Pilot | null> {
        try {
            const pilot = await this.pilotService.getPilotByEmail(email);
            return pilot;
        } catch (error) {
            console.error("Error in getPilotByEmail query:", error);
            throw new Error("Error while fetching pilot by email");
        }
    }
}