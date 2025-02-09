import {forwardRef , Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EventModule } from 'src/event/event.module';
import { FavoritesModule } from 'src/favorite/favorites.module';
import { NotificationModule } from 'src/notification/notification.module';
@Module({
  imports:[TypeOrmModule.forFeature([User]),
  forwardRef(() => NotificationModule),
  forwardRef(() => FavoritesModule),
  forwardRef(() => EventModule),],
  controllers: [UserController],
  providers: [UserService],
  exports:[TypeOrmModule]
})
export class UserModule {}
