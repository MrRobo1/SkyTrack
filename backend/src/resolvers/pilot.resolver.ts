import { Mutation, Resolver, Query, Arg, Ctx } from "type-graphql";
import { MyContext } from "../types/index";
import { Pilot } from "../entities/pilot.entity";
import { PilotService } from "../services/pilot.service";
import { InputPilotCreate } from "../inputs/inputPilotCreate";
import { InputPilotLogin } from "../inputs/inputPilotLogin";
import { LoginResponse } from "../inputs/loginResponse";

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

    @Query(() => Pilot, { nullable: true })
    async getProfile(@Ctx() ctx: MyContext): Promise<Pilot | null> {
        const pilotId = ctx.user?.id;
        if (!pilotId) {
            return null;
        }
        const pilot = await Pilot.findOne ({ where: { id: pilotId } });
        return pilot || null;
    }

    @Mutation(() => String)
    async register(@Arg("newPilotData") newPilotData: InputPilotCreate): Promise<String> {
        try {
            await this.pilotService.createPilot(newPilotData);
            return "New pilot has been created with sucess";
        } catch (error) {
            console.error("Error in createPilot resolver:", error);
            throw new Error("Error while creating pilot");
        }
    }

    @Mutation(() => LoginResponse)
    async login(@Arg("loginData") loginData: InputPilotLogin): Promise<LoginResponse> {
        try{
            const { token, pilot } = await this.pilotService.loginPilot(loginData);
            return {token, pilot};
        } catch (error) {
            console.error("Error in login mutation:", error);
            throw new Error("Login failed");
        }
    }
}