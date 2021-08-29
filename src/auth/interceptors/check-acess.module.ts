import { forwardRef, Module, Scope } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from 'src/doctor/doctor.module';
import { DoctorService } from 'src/doctor/doctor.service';
import { PacientModule } from 'src/pacient/pacient.module';
import { PacientService } from 'src/pacient/pacient.service';
import { AuthModule } from '../auth.module';
import { AuthService } from '../auth.service';
import { CheckAccessInterceptor } from './check-access.interceptor';

@Module({
    imports: [forwardRef(() => AuthModule)],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            scope: Scope.REQUEST,
            useClass: CheckAccessInterceptor,
        },
    ],
})
export class CheckAccessModule { }