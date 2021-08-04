import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacientModule } from './pacient/pacient.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.17.0.2',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'hospital',
      autoLoadEntities: true,
      synchronize: true
    }),
    PacientModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule { }