import { Field, ID, ObjectType } from "type-graphql";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { Pilot } from "./pilot.entity";
import { Airplane } from "./airplane.entity";
import { Airport } from "./airport.entity";
@ObjectType()
@Entity()
export class Flight extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    distance: number;

    @Field()
    @Column('timestamp', {name: 'departure_time'})
    departure_time: Date;

    @Field()
    @Column('timestamp', {name: 'arrival_time'})
    arrival_time: Date;

    @Field()
    @CreateDateColumn({name: 'flight_date'})
    flight_date: Date;

    @Field()
    @Column()
    number_of_passangers: number;

    @Field()
    @Column()
    fuel_quantity: number;

    @Field()
    @Column({ type: 'text', nullable: true })
    comment: string;

    @Field(() => Pilot)
    @ManyToOne(() => Pilot, (pilote) => pilote.flights, { onDelete: "CASCADE" })
    pilot: Pilot;

    @Field(() => Airplane)
    @ManyToOne(() => Airplane, (airplane) => airplane.flights)
    airplane: Airplane;

    @Field(() => Airport)
    @ManyToOne(() => Airport, (airport) => airport.departures)
    departure_airport: Airport;

    @Field(() => Airport)
    @ManyToOne(() => Airport, (airport) => airport.arrivals)
    arrival_airport: Airport;
}