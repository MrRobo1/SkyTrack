import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class Flight extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('float')
    distance: number;

    @Column('time')
    departure_time: string;

    @Column('time')
    arrival_time: string;

    @Column('date')
    flight_date: string;

    @Column('int')
    number_of_passangers: number;

    @Column('float')
    fuel_quantity: number;

    @Column({ type: 'text', nullable: true })
    comment: string;
}