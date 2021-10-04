import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException } from "src/exceptions/BadRequestException";
import { Pacient } from "./pacient";
import { ErrorType } from "src/enums/ErrorType";
import { Repository, Transaction } from "typeorm";

@Injectable()
export class PacientService {

    constructor(
        @InjectRepository(Pacient)
        private readonly pacientRepository: Repository<Pacient>
    ) { }

    findAll(): Promise<Pacient[]> {
        return this.pacientRepository.find();
    }

    @Transaction()
    public async registerPacient(pacient: Pacient): Promise<Pacient> {
        const existsPacientWithSameCpf = await this.pacientRepository.findOne({
            where: { cpf: pacient.cpf }
        });
        if (existsPacientWithSameCpf) {
            throw new BadRequestException("HMA-0001", ErrorType.HMA0001);
        }
        return this.pacientRepository.save(pacient);
    }

    public async findPacientByCpf(cpf: string): Promise<Pacient> {
        const pacient = await this.pacientRepository.findOne({ where: { cpf: cpf } });
        if (!pacient) {
            throw new BadRequestException("HMA-0003", ErrorType.HMA0003);
        }
        return pacient;
    }

    public async findPacientByEmail(email: string): Promise<Pacient> {
        return await this.pacientRepository.findOne({ where: { email: email } });
    }

    async findById(id: string): Promise<Pacient> {
        const pacient = await this.pacientRepository.findOne(id);
        if (!pacient) {
            throw new BadRequestException("HMA-0003", ErrorType.HMA0003);
        }
        return pacient;
    }

    async updatePacient(id: string, pacientUpdate: Pacient): Promise<Pacient> {
        await this.findById(id);
        const pacient = this.pacientRepository.create(pacientUpdate);
        pacient.id = id;
        return this.pacientRepository.save(pacient);
    }

    async deletePacient(id: string) {
        await this.findById(id);
        this.pacientRepository.delete(id);
    }
}