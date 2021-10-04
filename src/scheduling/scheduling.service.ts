import { InjectRepository } from "@nestjs/typeorm";
import { Doctor } from "src/doctor/doctor";
import { DoctorService } from "src/doctor/doctor.service";
import { StatusScheduling } from "src/enums/StatusScheduling";
import { Repository, Between } from "typeorm";
import { SchedulingDTO } from "./dto/scheduling-dto";
import { Scheduling } from "./scheduling";
import { SchedulingRepository } from "./scheduling.repository";

export class SchedulingService {

    constructor(
        @InjectRepository(Scheduling)
        private readonly schedulingRepository: SchedulingRepository,
        private readonly doctorService: DoctorService
    ) { }

    public async scheduleConsultation(schedulingDto: SchedulingDTO): Promise<Scheduling> {
        const scheduling: Scheduling = await this.schedulingRepository.create(schedulingDto);
        scheduling.status = StatusScheduling.SCHEDULED;
        scheduling.doctor = await this.doctorService.findById(schedulingDto.id_doctor);
        return await this.schedulingRepository.save(scheduling);
    }

    public async findAllSchedules(): Promise<Scheduling[]> {
        return this.schedulingRepository.find();
    }
}