import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { MailModule } from './mail/mail.module';
import { PacientModule } from './pacient/pacient.module';
import { SchedulingModule } from './scheduling/scheduling.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'hospital',
      username: 'pguser',
      password: 'pgpassword',
      autoLoadEntities: true,
      synchronize: true
    }),
    PacientModule,
    DoctorModule,
    AuthModule,
    SchedulingModule,
    MailModule
  ],
  controllers: [],
  providers: []
})

export class AppModule { }