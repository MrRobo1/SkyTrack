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
    @Column('float')
    airport_name: string;

    @Field()
    @Column('time')
    code_ICAO: string;

    @Field()
    @Column('time')
    city: string;

    @Field()
    @Column('date')
    country: string;

    @Field(() => [Flight])
    @OneToMany(() => Flight, (flight) => flight.airport)
    flights: Flight[];
}