import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../schema';
import { GameRepository } from '../repositories/game.repository';
import { GameService } from '../services/game.service';
import { GameController } from '../controllers/game.controller';
import { PlayerModule } from './player.module';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), PlayerModule],
  providers: [GameRepository, GameService],
  controllers: [GameController],
  exports: [GameService],
})
export class GameModule {}
