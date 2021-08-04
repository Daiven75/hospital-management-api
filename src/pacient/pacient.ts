import { Gender } from "src/models/Gender";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pacient {

    @PrimaryGeneratedColumn("uuid")
    id_pacient?: string;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    email: string;

    @Column()
    age: number;

    @Column()
    gender: Gender;

    @Column()
    phoneNumber: string;
}