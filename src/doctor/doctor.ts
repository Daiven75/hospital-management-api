import { Gender } from "src/enums/Gender";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Doctor {

    @PrimaryGeneratedColumn("uuid")
    id_doctor: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({ length: 15 })
    crm: string;

    @Column()
    email: string;

    @Column("enum", { enum: Gender })
    gender: Gender;

    @Column("simple-array")
    qualifications: string[];

    @Column({ scale: 2 })
    phoneNumber: number;

    @Column("date")
    dateJoining: string;
}