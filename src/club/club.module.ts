import { forwardRef , Module } from '@nestjs/common';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from './entity/club.entity';
import { EventModule } from 'src/event/event.module';

@Module({
  imports:[TypeOrmModule.forFeature([Club]),
    forwardRef(() => EventModule)],
  controllers: [ClubController],
  providers: [ClubService],
  exports:[TypeOrmModule , ClubService]
})
export class ClubModule {

}
