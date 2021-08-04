import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException } from "src/exceptions/BadRequestException";
import { Gender } from "src/models/Gender";
import { Pacient } from "./pacient";
import { PacientRepository } from "./pacient.repository";

@Injectable()
export class PacientService {

    constructor(
        @InjectRepository(Pacient)
        private readonly pacientRepository: PacientRepository
    ) { }

    findAll(): Promise<Pacient[]> {
        return this.pacientRepository.find();
    }

    async registerPacient(pacient: Pacient): Promise<Pacient> {
        const existsPacientWithSameCpf = await this.pacientRepository.findOne({
            where: { cpf: pacient.cpf }
        });
        if (existsPacientWithSameCpf) {
            throw new BadRequestException("PAC-0001", Gender.PAC0005);
        }
        return this.pacientRepository.save(pacient);
    }

    async findPacientByCpf(cpf: string): Promise<Pacient> {
        const pacient = await this.pacientRepository.findOne({ where: { cpf: cpf } });
        if (!pacient) {
            throw new BadRequestException("PAC-0001", Gender.PAC0005);
        }
        return pacient;
    }

    async findById(id: string): Promise<Pacient> {
        const pacient = await this.pacientRepository.findOne(id);
        if (!pacient) {
            throw new BadRequestException("PAC-0001", Gender.PAC0005);
        }
        return pacient;
    }

    async updatePacient(id: string, pacientUpdate: Pacient): Promise<Pacient> {
        await this.findById(id);
        const pacient = this.pacientRepository.create(pacientUpdate);
        pacient.id_pacient = id;
        return this.pacientRepository.save(pacient);
    }

    async deletePacient(id: string): Promise<void> {
        await this.findById(id);
        this.pacientRepository.delete(id);
    }
}