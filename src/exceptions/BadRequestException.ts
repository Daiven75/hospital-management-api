import { HttpException, HttpStatus } from "@nestjs/common";

export class BadRequestException extends HttpException {

    constructor(code: string, message: string) {
        super({
            status: HttpStatus.BAD_REQUEST,
            codigo: code,
            message: message
        }, HttpStatus.BAD_REQUEST)
    }
}