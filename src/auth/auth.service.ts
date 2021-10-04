import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DoctorService } from "src/doctor/doctor.service";
import { Pacient } from "src/pacient/pacient";
import { PacientService } from "src/pacient/pacient.service";
import * as bcrypt from 'bcrypt';
import { LoginDTO } from "./dto/login.dto";
import { Request } from "express";

@Injectable()
export class AuthService {

    constructor(
        private readonly doctorService: DoctorService,
        private readonly pacientService: PacientService,
        private readonly jwtService: JwtService
    ) { }

    public async login(loginDto: LoginDTO): Promise<string> {

        if (loginDto.crm) return this.verifyDoctor(loginDto);

        const pacient: Pacient = await this.verifyDataPacient(loginDto);

        await this.checkCredentials(loginDto.password, pacient);

        return await this.jwtService.signAsync({ id: pacient.id });
    }

    private async verifyDoctor(loginDto: LoginDTO): Promise<string> {
        const doctor = await this.doctorService.findByCrm(loginDto.crm);

        await this.checkCredentials(loginDto.password, doctor);

        return await this.jwtService.signAsync({ id: doctor.id });
    }

    private async verifyDataPacient(loginDto: LoginDTO): Promise<Pacient> {
        if (loginDto.email) {
            return await this.pacientService.findPacientByEmail(loginDto.email);
        }
        return await this.pacientService.findPacientByCpf(loginDto.cpf);
    }

    private async checkCredentials(password: string, data: any) {
        if (!data || !await bcrypt.compare(password, data.password)) {
            throw new BadRequestException('Invalid credentials');
        }
    }

    public async checkAccess(request: Request) {
        try {
            await this.jwtService.verifyAsync(request.cookies['jwt']);
        } catch (err) {
            throw new UnauthorizedException();
        }
    }
}