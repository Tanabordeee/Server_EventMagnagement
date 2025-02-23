import {forwardRef , Module } from '@nestjs/common';
import { UsersController } from './UsersController';
import { UsersService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EventModule } from 'src/event/event.module';
@Module({
  imports:[TypeOrmModule.forFeature([User]),
  forwardRef(()=> EventModule),],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[TypeOrmModule , UsersService]
})
export class UserModule {}
