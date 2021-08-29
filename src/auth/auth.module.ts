import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DoctorModule } from "src/doctor/doctor.module";
import { PacientModule } from "src/pacient/pacient.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '8888s' }
        }),
        DoctorModule,
        PacientModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})

export class AuthModule { }