import { forwardRef, Module, Scope } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from '../auth.module';
import { CheckAccessInterceptor } from './check-access.interceptor';

@Module({
    imports: [forwardRef(() => AuthModule)],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            scope: Scope.REQUEST,
            useClass: CheckAccessInterceptor,
        },
    ],
})
export class CheckAccessModule { }