import { forwardRef , Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entity/event.entity';
import { FavoritesModule } from 'src/favorite/favorites.module';
import { UserModule } from 'src/user/user.module';
import { NotificationModule } from 'src/notification/notification.module';
import { AdminModule } from 'src/admin/admin.module';
import { ClubModule } from 'src/club/club.module';
@Module({
  imports:[TypeOrmModule.forFeature([Event]),
  forwardRef(() => FavoritesModule),
  forwardRef(() => UserModule),
  forwardRef(() => NotificationModule),
  forwardRef(() => AdminModule),
  forwardRef(() => ClubModule),
  ],
  controllers: [EventController],
  providers: [EventService],
  exports:[TypeOrmModule]
})
export class EventModule {}
