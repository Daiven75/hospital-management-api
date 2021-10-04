import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { CheckAccessInterceptor } from "src/auth/interceptors/check-access.interceptor";
import { Pacient } from "./pacient";
import { PacientService } from "./pacient.service";

@UseInterceptors(CheckAccessInterceptor)
@Controller("/pacients")
export class PacientController {
    constructor(private readonly pacientService: PacientService) { }

    @Get()
    findAllPacients(): Promise<Pacient[]> {
        return this.pacientService.findAll();
    }

    @Post()
    @HttpCode(201)
    registerPacient(@Body() pacient: Pacient): Promise<Pacient> {
        return this.pacientService.registerPacient(pacient);
    }

    @Get('/:id')
    findById(@Param('id') id): Promise<Pacient> {
        return this.pacientService.findById(id);
    }

    @Put('/:id')
    @HttpCode(201)
    updatePacient(@Param('id') id: string, @Body() pacient: Pacient): Promise<Pacient> {
        return this.pacientService.updatePacient(id, pacient);
    }

    @Delete('/:id')
    deletePacient(@Param('id') id): void {
        this.pacientService.deletePacient(id);
    }
}