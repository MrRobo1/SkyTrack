import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class Pilot extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    registration_date: Date;

    @Column()
    avatar: string;
}