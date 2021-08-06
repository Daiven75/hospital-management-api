import { Gender } from "src/enums/Gender";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pacient {

    @PrimaryGeneratedColumn("uuid")
    id_pacient?: string;

    @Column()
    name: string;

    @Column({ length: 15 })
    cpf: string;

    @Column()
    email: string;

    @Column({ scale: 2 })
    age: number;

    @Column("enum", { enum: Gender })
    gender: Gender;

    @Column({ scale: 2 })
    phoneNumber: number;
}