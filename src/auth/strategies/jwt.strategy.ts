import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(ConfigService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) =>{
            return request?.cookies?.accessToken;
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: ConfigService.get("JWT_SECRET"),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}