import { InjectRepository } from "@nestjs/typeorm";
import { DoctorService } from "src/doctor/doctor.service";
import { ErrorType } from "src/enums/ErrorType";
import { StatusScheduling } from "src/enums/StatusScheduling";
import { BadRequestException } from "src/exceptions/BadRequestException";
import { Repository, Between } from "typeorm";
import { SchedulingDTO } from "./dto/scheduling-dto";
import { Scheduling } from "./scheduling";

export class SchedulingService {

    constructor(
        @InjectRepository(Scheduling)
        private readonly schedulingRepository: Repository<Scheduling>,
        private readonly doctorService: DoctorService
    ) { }

    public async scheduleConsultation(schedulingDto: SchedulingDTO): Promise<Scheduling> {

        if (await this.checkConflictsSchedules(
            schedulingDto.scheduleStartTime.toString(),
            schedulingDto.scheduleEndTime.toString(),
            schedulingDto.id_doctor)
        ) {
            throw new BadRequestException("HMA0005", ErrorType.HMA0005);
        }

        const scheduling: Scheduling = await this.schedulingRepository.create(schedulingDto);
        scheduling.status = StatusScheduling.SCHEDULED;
        scheduling.doctor = await this.doctorService.findById(schedulingDto.id_doctor);
        return await this.schedulingRepository.save(scheduling);
    }

    public async findAll(): Promise<Scheduling[]> {
        return await this.schedulingRepository.find();
    }

    private async checkConflictsSchedules(startDate: string, endDate: string, id_doctor: string): Promise<boolean> {
        const schedules: Scheduling[] = await this.schedulingRepository.find({
            where: {
                doctor: id_doctor,
                scheduleStartTime: Between(startDate, endDate)
            }
        });
        return schedules.length > 0 ? true : false;
    }
}