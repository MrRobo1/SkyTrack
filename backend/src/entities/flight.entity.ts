import { Field, ID, ObjectType } from "type-graphql";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
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
    @Column('float')
    distance: number;

    @Field()
    @Column('time')
    departure_time: string;

    @Field()
    @Column('time')
    arrival_time: string;

    @Field()
    @Column('date')
    flight_date: string;

    @Field()
    @Column('int')
    number_of_passangers: number;

    @Field()
    @Column('float')
    fuel_quantity: number;

    @Field()
    @Column({ type: 'text', nullable: true })
    comment: string;

    @Field(() => Pilot)
    @ManyToOne(() => Pilot, (pilote) => pilote.flights, { onDelete: "CASCADE" })
    pilot: Pilot;

    @Field(() => Airplane)
    @OneToMany(() => Airplane, (airplane) => airplane.flights)
    airplane: Airplane;

    @Field(() => Airport)
    @OneToMany(() => Airport, (airport) => airport.flights)
    airport: Airport;
}