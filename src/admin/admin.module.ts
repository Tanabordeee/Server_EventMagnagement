import { forwardRef,Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entity/admin.entity';
import { EventModule } from 'src/event/event.module';

@Module({
  imports:[TypeOrmModule.forFeature([Admin]),
  forwardRef(() => EventModule)],
  controllers: [AdminController],
  providers: [AdminService],
  exports:[TypeOrmModule , AdminService]
})
export class AdminModule {}
