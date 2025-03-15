import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.startegy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminStrategy } from './strategies/admin.startegy';
import { AdminModule } from 'src/admin/admin.module';
import { ClubStrategy } from './strategies/club.startegy';
import { ClubModule } from 'src/club/club.module';

@Module({
  imports: [
    UserModule,
    AdminModule,
    ClubModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy , AdminStrategy , ClubStrategy],
})
export class AuthModule {}
