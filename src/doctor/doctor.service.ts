import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorType } from "src/enums/ErrorType";
import { BadRequestException } from "src/exceptions/BadRequestException";
import { Repository } from "typeorm";
import { Doctor } from "./doctor";
import * as bcrypt from 'bcrypt';
import { DoctorDTO } from "./dto/create-doctor.dto";

@Injectable()
export class DoctorService {

    constructor(
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>
    ) { }

    public async findAll(): Promise<Doctor[]> {
        return await this.doctorRepository.find();
    }

    public async registerDoctor(createDoctorDto: DoctorDTO): Promise<Doctor> {
        createDoctorDto.password = await bcrypt.hash(createDoctorDto.password, 12);

        const existsDoctorWithSameCrm = await this.doctorRepository.findOne({
            where: { crm: createDoctorDto.crm }
        });

        if (existsDoctorWithSameCrm) {
            throw new BadRequestException("HMA0002", ErrorType.HMA0002);
        }

        const doctor = await this.doctorRepository.create(createDoctorDto);
        return await this.doctorRepository.save(doctor);
    }

    public async findById(id: string): Promise<Doctor> {
        const doctor = await this.doctorRepository.findOne(id);
        if (!doctor) {
            throw new BadRequestException("HMA-0004", ErrorType.HMA0004)
        }
        return doctor;
    }

    public async findByCrm(crm: string): Promise<Doctor> {
        return await this.doctorRepository.findOne({
            where: { crm: crm }
        });
    }

    public async updateDoctor(id: string, updateDoctor: DoctorDTO): Promise<Doctor> {
        await this.findById(id);
        const doctorUpdate: Doctor = this.doctorRepository.create(updateDoctor);
        doctorUpdate.id = id;
        return await this.doctorRepository.save(doctorUpdate);
    }

    public async deleteDoctor(id: string): Promise<void> {
        await this.findById(id);
        this.doctorRepository.delete(id);
    }

    public async findbyEmail(email: string, wishBooleanResult: boolean): Promise<Doctor | boolean> {
        const doctor: Doctor = await this.doctorRepository.findOne({
            where: { email: email }
        });
        if (wishBooleanResult) {
            return doctor ? true : false;
        }
        if (!doctor) {
            throw new BadRequestException("HMA-0004", ErrorType.HMA0004)
        }
        return doctor;
    }
}