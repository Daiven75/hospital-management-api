import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { Doctor } from "./doctor";
import { DoctorService } from "./doctor.service";
import { CreateDoctorDTO } from "./dto/create-doctor.dto";
import { Request } from "express";
import { UseInterceptors } from "@nestjs/common";
import { CheckAccessInterceptor } from "src/auth/interceptors/check-access.interceptor";

@UseInterceptors(CheckAccessInterceptor)
@Controller("/doctors")
export class DoctorController {

    constructor(
        private readonly doctorService: DoctorService,
    ) { }

    @Get()
    public async findAll(@Req() request: Request): Promise<Doctor[]> {
        return this.doctorService.findAll();
    }

    @Post()
    public async registerDoctor(@Body() createDoctorDto: CreateDoctorDTO): Promise<Doctor> {
        return await this.doctorService.registerDoctor(createDoctorDto);
    }

    @Get('/:id')
    public async findById(@Req() request: Request, @Param('id') id: string): Promise<Doctor> {
        return this.doctorService.findById(id);
    }

    @Put('/:id')
    public async updateDoctor(@Param('id') id: string, @Body() doctor: Doctor): Promise<Doctor> {
        return this.doctorService.updateDoctor(id, doctor);
    }

    @Delete(':/id')
    public async deleteDoctor(@Param('id') id: string) {
        this.doctorService.deleteDoctor(id);
    }
}