import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class ClubStrategy extends PassportStrategy(Strategy, 'club') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // This tells Passport to use 'email' instead of 'username'
  }

  async validate(email: string, password: string): Promise<any> {
    const Club = await this.authService.validateClub(email, password);
    if (!Club) {
      throw new UnauthorizedException();
    }
    return Club
  }
}