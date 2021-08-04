import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pacient } from "./pacient";
import { PacientController } from "./pacient.controller";
import { PacientService } from "./pacient.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Pacient])
    ],
    controllers: [PacientController],
    providers: [PacientService]
})

export class PacientModule { }