import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { Flight } from "../entities/flight.entity";
import { FlightService } from "../services/flight.service";
import { CreateFlightInput } from "../inputs/createFlightInput";
import { MyContext } from "../types/index";

@Resolver(() => Flight)
export default class FlightResolver {
    private flightService = new FlightService();

    @Query(() => [Flight])
    async getAllFlights(): Promise<Flight[]> {
        return this.flightService.getAllFlight();
    }

    @Mutation(() => Flight)
    async createFlight(
        @Arg("data") data: CreateFlightInput,
        @Ctx() ctx: MyContext
    ): Promise<Flight> {
        const pilotId = ctx.user?.id;
        if (!pilotId) {
            throw new Error("Not authenticated");
        }

        return this.flightService.createFlight(pilotId, data);
    }

    @Query(() => Flight, { nullable:true })
    async getLastFlight(): Promise<Flight | null> {
        return this.flightService.getLastFlight();
    }
    
}