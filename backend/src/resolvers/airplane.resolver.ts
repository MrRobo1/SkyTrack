import { Resolver, Query } from "type-graphql";
import { Airplane } from "../entities/airplane.entity";
import { AirplaneService } from "../services/airplane.service";

@Resolver(() => Airplane)
export default class AirplaneResolver {
    private airplaneService = new AirplaneService();

    @Query(() => [Airplane])
    async getAllAirplane(): Promise<Airplane[]> {
        return this.airplaneService.getAllAirplane();
    }
}