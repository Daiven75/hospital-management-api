import { Injectable } from "@nestjs/common";
import { CallHandler, ExecutionContext, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class CheckAccessInterceptor implements NestInterceptor {

    constructor(private readonly authService: AuthService) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<any> {

        await this.authService.checkAccess(context.switchToHttp().getRequest());

        return next.handle().pipe(tap(() => {
            console.log("Segue o fluxo...")
        }));
    }
}