import { InputType, Field } from "type-graphql";

@InputType()
export class CreateFlightInput {
    @Field()
    airplaneId: number;

    @Field()
    airportId: number;

    @Field()
    distance: number;

    @Field()
    departure_time: Date;

    @Field()
    arrival_time: Date;

    @Field()
    number_of_passangers: number;

    @Field()
    fuel_quantity: number;

    @Field({ nullable: true })
    comment?: string;
}