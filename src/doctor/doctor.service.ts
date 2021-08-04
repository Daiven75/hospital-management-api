import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException } from "src/exceptions/BadRequestException";
import { Gender } from "src/models/Gender";
import { Repository } from "typeorm";
import { Doctor } from "./doctor";

@Injectable()
export class DoctorService {

    constructor(
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>
    ) { }

    findAll(): Promise<Doctor[]> {
        return this.doctorRepository.find();
    }

    registerDoctor(doctor: Doctor): Promise<Doctor> {
        const existsDoctorWithSameCrm = this.doctorRepository.findOne({
            where: { crm: doctor.crm }
        });
        if (existsDoctorWithSameCrm) {
            throw new BadRequestException("", Gender.PAC0005);
        }
        return this.doctorRepository.save(doctor);
    }

}