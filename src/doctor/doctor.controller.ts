import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { CheckAccessInterceptor } from "src/auth/interceptors/check-access.interceptor";
import { Doctor } from "./doctor";
import { DoctorService } from "./doctor.service";
import { DoctorDTO } from "./dto/create-doctor.dto";

@UseInterceptors(CheckAccessInterceptor)
@Controller("/doctors")
export class DoctorController {

    constructor(
        private readonly doctorService: DoctorService,
    ) { }

    @Get()
    public async findAll(): Promise<Doctor[]> {
        return this.doctorService.findAll();
    }

    @Post()
    public async registerDoctor(@Body() createDoctorDto: DoctorDTO): Promise<Doctor> {
        return await this.doctorService.registerDoctor(createDoctorDto);
    }

    @Get('/:id')
    public async findById(@Param('id') id: string): Promise<Doctor> {
        return this.doctorService.findById(id);
    }

    @Delete(':/id')
    public async deleteDoctor(@Param('id') id: string) {
        this.doctorService.deleteDoctor(id);
    }
}