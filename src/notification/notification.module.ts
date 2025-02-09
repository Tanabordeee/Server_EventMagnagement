import { forwardRef , Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { EventModule } from 'src/event/event.module';
import { UserModule } from 'src/user/user.module';
@Module({
  imports:[TypeOrmModule.forFeature([Notification]),
      forwardRef(() => EventModule),
      forwardRef(() => UserModule)],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports:[TypeOrmModule]
})
export class NotificationModule {}
