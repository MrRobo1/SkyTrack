import { Field, ID, ObjectType } from "type-graphql";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Flight } from "./flight.entity";

@ObjectType()
@Entity()
export class Airplane extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column('float')
    airplane_name: string;

    @Field()
    @Column('time')
    registration: string;

    @Field(() => [Flight])
    @OneToMany(() => Flight, (flight) => flight.airplane)
    flights: Flight[];
}