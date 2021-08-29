import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Pacient } from "./pacient";
import { PacientController } from "./pacient.controller";
import { PacientService } from "./pacient.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Pacient]),
        forwardRef(() => AuthModule),
    ],
    controllers: [PacientController],
    providers: [PacientService],
    exports: [PacientService, TypeOrmModule]
})

export class PacientModule { }