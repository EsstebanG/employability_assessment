import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(
        private readonly config: ConfigService,
        private readonly reflector: Reflector,
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;

        const req = context.switchToHttp().getRequest();
        const provided = req.headers['x-api-key'] as string | undefined;
        const expected = this.config.getOrThrow<string>('X_API_KEY');

        if (!provided || provided !== expected) {
          throw new UnauthorizedException('Invalid or missing x-api-key');
        }
        
        return true;
    }
}
