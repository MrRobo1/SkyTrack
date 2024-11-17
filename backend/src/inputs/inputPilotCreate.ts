import { Field, InputType } from 'type-graphql';

@InputType()
export class InputPilotCreate {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    avatar: string;
}