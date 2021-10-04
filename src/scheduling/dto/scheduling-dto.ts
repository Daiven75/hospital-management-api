import { OmitType } from "@nestjs/mapped-types";
import { Scheduling } from "../scheduling";

export class SchedulingDTO extends OmitType(
    Scheduling, ['id', 'instant', 'status', 'doctor']
) {
    id_doctor: string;
}