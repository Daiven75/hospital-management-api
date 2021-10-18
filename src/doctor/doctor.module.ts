import { forwardRef } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Doctor } from "./doctor";
import { DoctorController } from "./doctor.controller";
import { DoctorService } from "./doctor.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Doctor]),
        forwardRef(() => AuthModule),
    ],
    controllers: [DoctorController],
    providers: [DoctorService],
    exports: [TypeOrmModule, DoctorService]
})

export class DoctorModule { }