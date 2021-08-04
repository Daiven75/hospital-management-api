import { Body, Controller, Get, Post } from "@nestjs/common";
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
}