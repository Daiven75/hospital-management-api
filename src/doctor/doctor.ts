import { Gender } from "src/models/Gender";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Doctor {

    @PrimaryGeneratedColumn("uuid")
    id_doctor?: string;

    @Column()
    name: string;

    @Column()
    crm: string;

    @Column()
    email: string;

    @Column()
    gender: Gender;

    @Column()
    qualifications: string[];

    @Column()
    phoneNumber: string;

    @Column()
    dateJoining: Date;
}