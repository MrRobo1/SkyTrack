import { Resolver, Query } from "type-graphql";
import { Airport } from "../entities/airport.entity";
import { AirportService } from "../services/airport.service";

@Resolver(() => Airport)
export default class AirportResolver {
    private airportService = new AirportService();

    @Query(() => [Airport])
    async getAllAirports(): Promise<Airport[]> {
        return this.airportService.getAllAirports();
    }
}