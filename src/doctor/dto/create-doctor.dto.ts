import { OmitType } from '@nestjs/mapped-types';
import { Doctor } from '../doctor';

export class CreateDoctorDTO extends OmitType(Doctor, ['id_doctor', 'dateJoining']) { }