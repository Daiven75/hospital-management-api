import { Body, Controller, Get, Post } from "@nestjs/common";
import { SchedulingDTO } from "./dto/scheduling-dto";
import { Scheduling } from "./scheduling";
import { SchedulingService } from "./scheduling.service";

@Controller("/scheduling")
export class SchedulingController {

    constructor(private readonly schedulingService: SchedulingService) { }

    @Post()
    public async scheduleConsultation(@Body() schedulingDto: SchedulingDTO): Promise<Scheduling> {
        return this.schedulingService.scheduleConsultation(schedulingDto);
    }

    @Get()
    public async findAll(): Promise<Scheduling[]> {
        return this.schedulingService.findAll();
    }

}