import { Injectable, Scope } from "@nestjs/common";
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { tap } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({ scope: Scope.REQUEST })
export class CheckAccessInterceptor implements NestInterceptor {

    constructor(private readonly authService: AuthService) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<any> {

        await this.authService.checkAccess(context.switchToHttp().getRequest());

        return next.handle().pipe(tap(() => {
            console.log("Segue o fluxo...")
        }));
    }
}