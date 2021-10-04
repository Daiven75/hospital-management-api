import { type } from "os";
import { Gender } from "src/enums/Gender";
import { Scheduling } from "src/scheduling/scheduling";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['crm', 'email', 'phoneNumber'])
export class Doctor {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false, type: 'varchar', length: 10 })
    crm: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    email: string;

    @Column("enum", { enum: Gender })
    gender: Gender;

    @Column("simple-array")
    specialty: string[];

    @OneToMany(type => Scheduling, (scheduling) => scheduling.doctor)
    schedules: Scheduling[];

    @Column({ scale: 2 })
    phoneNumber: number;

    @CreateDateColumn()
    dateJoining: Date;

    @UpdateDateColumn()
    updateAt: Date;
}