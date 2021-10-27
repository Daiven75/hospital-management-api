import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from 'src/doctor/doctor.module';
import { MailModule } from 'src/mail/mail.module';
import { PacientModule } from 'src/pacient/pacient.module';
import { Scheduling } from './scheduling';
import { SchedulingController } from './scheduling.controller';
import { SchedulingService } from './scheduling.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Scheduling]),
        DoctorModule,
        MailModule,
        PacientModule
    ],
    controllers: [SchedulingController],
    providers: [SchedulingService]
})
export class SchedulingModule { }