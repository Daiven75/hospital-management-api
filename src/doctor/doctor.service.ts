import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorType } from "src/enums/ErrorType";
import { BadRequestException } from "src/exceptions/BadRequestException";
import { Repository } from "typeorm";
import { Doctor } from "./doctor";
import { CreateDoctorDTO } from "./dto/create-doctor.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorService {

    constructor(
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>
    ) { }

    async findAll(): Promise<Doctor[]> {
        return await this.doctorRepository.find();
    }

    async registerDoctor(createDoctorDto: CreateDoctorDTO): Promise<Doctor> {
        createDoctorDto.password = await bcrypt.hash(createDoctorDto.password, 12);

        const existsDoctorWithSameCrm = await this.doctorRepository.findOne({
            where: { crm: createDoctorDto.crm }
        });

        if (existsDoctorWithSameCrm) {
            throw new BadRequestException("HMA0002", ErrorType.HMA0002);
        }

        const doctor = await this.doctorRepository.create(createDoctorDto);
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

    public async findByCrm(crm: string): Promise<Doctor | undefined> {
        return await this.doctorRepository.findOne({
            where: { crm: crm }
        });
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

    public async findbyEmail(email: string): Promise<Doctor> {
        return await this.doctorRepository.findOne({
            where: { email: email }
        });
    }
}