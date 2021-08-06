import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { timestamp } from "rxjs";
import { ErrorType } from "src/enums/ErrorType";
import { BadRequestException } from "src/exceptions/BadRequestException";
import { Repository } from "typeorm";
import { Doctor } from "./doctor";

@Injectable()
export class DoctorService {

    constructor(
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>
    ) { }

    async findAll(): Promise<Doctor[]> {
        return await this.doctorRepository.find();
    }

    async registerDoctor(doctor: Doctor): Promise<Doctor> {
        const existsDoctorWithSameCrm = await this.doctorRepository.findOne({
            where: { crm: doctor.crm }
        });
        if (existsDoctorWithSameCrm) {
            throw new BadRequestException("HMA0002", ErrorType.HMA0002);
        }
        doctor.dateJoining = new Date().toISOString().split('T')[0];
        return await this.doctorRepository.save(doctor);
    }

    async findById(id: string): Promise<Doctor> {
        const doctor = await this.doctorRepository.findOne(id);
        if (!doctor) {
            throw new BadRequestException("HMA-0004", ErrorType.HMA0004)
        }
        return doctor;
    }

    async updateDoctor(id: string, doctor: Doctor): Promise<Doctor> {
        await this.findById(id);
        const doctorUpdate = this.doctorRepository.create(doctor);
        doctorUpdate.id_doctor = id;
        return this.doctorRepository.save(doctorUpdate);
    }

    async deleteDoctor(id: string): Promise<void> {
        await this.findById(id);
        this.doctorRepository.delete(id);
    }
}