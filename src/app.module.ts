import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ClubModule } from './club/club.module';
import { EventModule } from './event/event.module';
import { AdminModule } from './admin/admin.module';
import { User } from './user/entities/user.entity';
import { Club } from './club/entity/club.entity';
import { Admin } from './admin/entity/admin.entity';
import { Event } from './event/entity/event.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventService } from './event/event.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USER, 
      password: process.env.DB_PASSWORD,  
      database: process.env.DB_NAME, 
      entities: [User, Club, Event, Admin],
      synchronize: true,
      logging: true,
      ssl:{
        rejectUnauthorized: false,
      }
    }),
    UserModule,
    ClubModule,
    EventModule,
    AdminModule,
    AuthModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService , EventService],
})
export class AppModule {}
