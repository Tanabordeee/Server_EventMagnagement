import { forwardRef , Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entity/event.entity';
import { AdminModule } from 'src/admin/admin.module';
import { ClubModule } from 'src/club/club.module';
import { UserModule } from 'src/user/user.module';
import { EventUserService } from './EventUser.service';
import { EventClubService } from './EventClub.service';
import { EventAdminService } from './EventAdmin.service';
@Module({
  imports:[TypeOrmModule.forFeature([Event]),
  forwardRef(() => AdminModule),
  forwardRef(() => ClubModule),
  forwardRef(() => UserModule)
  ],
  controllers: [EventController],
  providers: [EventService , EventUserService , EventClubService , EventAdminService],
  exports:[TypeOrmModule , EventService]
})
export class EventModule {}
