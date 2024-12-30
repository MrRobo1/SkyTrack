import { Field, InputType } from "type-graphql";

@InputType()
export class InputPilotLogin {
    @Field()
    email: string;

    @Field()
    password: string;
}