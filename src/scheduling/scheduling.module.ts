import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from 'src/doctor/doctor.module';
import { DoctorService } from 'src/doctor/doctor.service';
import { Scheduling } from './scheduling';
import { SchedulingController } from './scheduling.controller';
import { SchedulingService } from './scheduling.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Scheduling]),
        DoctorModule
    ],
    controllers: [SchedulingController],
    providers: [SchedulingService]
})
export class SchedulingModule { }