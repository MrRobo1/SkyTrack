import { Resolver, Query } from "type-graphql";
import { Flight } from "../entities/flight.entity";
import { FlightService } from "../services/flight.service";

@Resolver(() => Flight)
export default class FlightResolver {
    private flightService = new FlightService();

    @Query(() => [Flight])
    async getAllFlights(): Promise<Flight[]> {
        return this.flightService.getAllFlight();
    }
}