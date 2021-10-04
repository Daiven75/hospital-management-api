import { OmitType } from '@nestjs/mapped-types';
import { Doctor } from '../doctor';

export class DoctorDTO extends OmitType(Doctor, ['id', 'dateJoining']) { }