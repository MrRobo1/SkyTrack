import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateFlightInput {
    @Field(() => Number, { nullable: true })
    fuel_quantity: number;

    @Field(() => Number, { nullable: true })
    number_of_passangers: number;

    @Field(() => Number, { nullable: true })
    distance: number;
}