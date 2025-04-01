import { ObjectType, Field } from "type-graphql";
import { Pilot } from "../entities/pilot.entity";

@ObjectType()
export class LoginResponse {
    @Field(() => String)
    token: string;

    @Field(() => Pilot)
    pilot: Pilot;
}