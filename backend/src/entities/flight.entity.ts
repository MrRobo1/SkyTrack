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
    @Column('number')
    distance: number;

    @Field()
    @Column()
    departure_time: string;

    @Field()
    @Column()
    arrival_time: string;

    @Field()
    @Column()
    flight_date: string;

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
    @OneToMany(() => Airplane, (airplane) => airplane.flights)
    airplane: Airplane;

    @Field(() => Airport)
    @OneToMany(() => Airport, (airport) => airport.flights)
    airport: Airport;
}