import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Doctor } from "./doctor";
import { DoctorService } from "./doctor.service";

@Controller("/doctors")
export class DoctorController {

    constructor(private readonly doctorService: DoctorService) { }

    @Get()
    findAll(): Promise<Doctor[]> {
        return this.doctorService.findAll();
    }

    @Post()
    registerDoctor(@Body() doctor: Doctor): Promise<Doctor> {
        return this.doctorService.registerDoctor(doctor);
    }

    @Get('/:id')
    findById(@Param('id') id: string): Promise<Doctor> {
        return this.doctorService.findById(id);
    }

    @Put('/:id')
    updateDoctor(@Param('id') id: string, @Body() doctor: Doctor): Promise<Doctor> {
        return this.doctorService.updateDoctor(id, doctor);
    }

    @Delete(':/id')
    deleteDoctor(@Param('id') id: string) {
        this.doctorService.deleteDoctor(id);
    }
}