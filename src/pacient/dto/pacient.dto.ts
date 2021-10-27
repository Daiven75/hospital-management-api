import { OmitType } from "@nestjs/mapped-types";
import { Pacient } from "../pacient";

export class PacientDTO extends OmitType(Pacient, ['id']) { }