import { ObjectType, Field, ID } from "type-graphql";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from "typeorm";
import { Flight } from "./flight.entity";
@ObjectType()
@Entity()
export class Pilot extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    password: string;

    @Field()
    @CreateDateColumn({name: 'registration_date'})
    registration_date: Date;

    @Field()
    @Column()
    avatar: string;

    @Field(() => [Flight])
    @OneToMany(() => Flight, (flight) => flight.pilot)
    flights: Flight[];
}