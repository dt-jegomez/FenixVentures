import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // Add any custom logic here
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}