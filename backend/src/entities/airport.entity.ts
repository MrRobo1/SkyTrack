import { ObjectType, ID, Field } from "type-graphql";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Flight } from "./flight.entity";

@ObjectType()
@Entity()
export class Airport extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column('varchar')
    airport_name: string;

    @Field()
    @Column('varchar')
    code_ICAO: string;

    @Field()
    @Column('varchar')
    city: string;

    @Field()
    @Column('varchar')
    country: string;

    @Field(() => [Flight])
    @OneToMany(() => Flight, (flight) => flight.departure_airport)
    departures: Flight[];

    @Field(() => [Flight])
    @OneToMany(() => Flight, (flight) => flight.arrival_airport)
    arrivals: Flight[];
}