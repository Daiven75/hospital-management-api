import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login.dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/login')
    public async login(
        @Body() loginDto: LoginDTO,
        @Res({ passthrough: true }) response: Response) {

        const jwt = await this.authService.login(loginDto);

        response.cookie('jwt', jwt, { httpOnly: true });

        return {
            message: 'sucess'
        };
    }

    @Post('/logout')
    public async logout(@Res({ passthrough: true }) response: Response) {

        response.clearCookie('jwt');

        return {
            message: 'sucess'
        };
    }
}