import { InjectRepository } from "@nestjs/typeorm";
import { DoctorService } from "src/doctor/doctor.service";
import { ErrorType } from "src/enums/ErrorType";
import { StatusScheduling } from "src/enums/StatusScheduling";
import { BadRequestException } from "src/exceptions/BadRequestException";
import { MailService } from "src/mail/mail.service";
import { PacientService } from "src/pacient/pacient.service";
import { Between, Repository } from "typeorm";
import { SchedulingDTO } from "./dto/scheduling.dto";
import { Scheduling } from "./scheduling";

export class SchedulingService {

    constructor(
        @InjectRepository(Scheduling)
        private readonly schedulingRepository: Repository<Scheduling>,
        private readonly doctorService: DoctorService,
        private readonly mailService: MailService,
        private readonly pacientService: PacientService
    ) { }

    public async scheduleConsultation(schedulingDto: SchedulingDTO): Promise<Scheduling> {
        const pacient = await this.pacientService.findPacientByCpf(schedulingDto.cpf);
        if (!pacient) {
            throw new BadRequestException("HMA006", ErrorType.HMA0006);
        }

        await this.checkConflictsSchedules(
            schedulingDto.scheduleStartTime.toString(),
            schedulingDto.scheduleEndTime.toString(),
            schedulingDto.id_doctor);

        const scheduling: Scheduling = await this.schedulingRepository.create(schedulingDto);
        scheduling.status = StatusScheduling.SCHEDULED;
        scheduling.doctor = await this.doctorService.findById(schedulingDto.id_doctor);

        this.mailService.sendEmailConfirmationSchedule(pacient.email, scheduling);

        return await this.schedulingRepository.save(scheduling);
    }

    public async findAll(): Promise<Scheduling[]> {
        return await this.schedulingRepository.find();
    }

    private async checkConflictsSchedules(startDate: string, endDate: string, id_doctor: string): Promise<void> {
        const schedules: Scheduling[] = await this.schedulingRepository.find({
            where: {
                doctor: id_doctor,
                scheduleStartTime: Between(startDate, endDate)
            }
        });
        if (schedules.length > 0) {
            throw new BadRequestException("HMA0005", ErrorType.HMA0005);
        }
    }
}