import {forwardRef , Module } from '@nestjs/common';
import { UsersController } from './UsersController';
import { UsersService } from './user.service';
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
  controllers: [UsersController],
  providers: [UsersService],
  exports:[TypeOrmModule]
})
export class UserModule {}
