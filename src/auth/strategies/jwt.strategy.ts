import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from '../../common/enums/role.enum';

export type JwtPayload = {
    sub: string;
    email: string;
    role: Role;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
            ignoreExpiration: false,
        });
    }

    async validate(payload: JwtPayload) {
        return { id: payload.sub, email: payload.email, role: payload.role };
    }
}
