import { type } from "os";
import { Doctor } from "src/doctor/doctor";
import { StatusScheduling } from "src/enums/StatusScheduling";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Scheduling {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'timestamp' })
    scheduleStartTime: Date;

    @Column({ type: 'timestamp' })
    scheduleEndTime: Date;

    @CreateDateColumn()
    instant: Date;

    @Column({ nullable: false, type: 'varchar', length: 11 })
    cpf: string;

    @ManyToOne(type => Doctor, (doctor) => doctor.schedules, { eager: true })
    @JoinColumn({ name: "doctor_id", referencedColumnName: "id" })
    doctor: Doctor;

    @Column({ nullable: false, type: 'varchar', length: 50 })
    specialty: string;

    @Column("enum", { enum: StatusScheduling })
    status: StatusScheduling;
}