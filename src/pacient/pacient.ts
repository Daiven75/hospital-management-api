import { Gender } from "src/enums/Gender";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['cpf'])
export class Pacient {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;

    @Column({ nullable: false, type: 'varchar', length: 11 })
    cpf: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    email: string;

    @Column({ scale: 2 })
    age: number;

    @Column("enum", { enum: Gender })
    gender: Gender;

    @Column({ scale: 2 })
    phoneNumber: number;
}