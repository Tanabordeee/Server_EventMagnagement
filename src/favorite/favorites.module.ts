import { forwardRef,Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { EventModule } from 'src/event/event.module';
import { UserModule } from 'src/user/user.module';
@Module({
  imports:[TypeOrmModule.forFeature([Favorite]),
    forwardRef(() => EventModule),
    forwardRef(() => UserModule)],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports:[TypeOrmModule]
})
export class FavoritesModule {}
