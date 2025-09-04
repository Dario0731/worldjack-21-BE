import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../schema';
import { PlayerRepository } from '../repositories/player.repository';
import { PlayerService } from '../services/player.service';
import { PlayerController } from '../controllers/player.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  providers: [PlayerRepository, PlayerService],
  controllers: [PlayerController],
  exports: [PlayerService],
})
export class PlayerModule {}
