import { Injectable, NotFoundException } from '@nestjs/common';
import { GameRepository } from '../repositories/game.repository';
import { PlayerService } from '../services/player.service';
import { Game } from '../schema';

@Injectable()
export class GameService {
  constructor(
    private readonly gameRepo: GameRepository,
    private readonly playerService: PlayerService,
  ) {}

  async startGame(playerId: string, betAmount: number): Promise<Game> {
    const player = await this.playerService.findByWorldId(playerId);
    if (!player) throw new NotFoundException('Player not found');

    if (player.balance < betAmount) {
      throw new Error('Insufficient balance');
    }

    await this.playerService.updateBalance(player.id, -betAmount);
    return await this.gameRepo.create(player, betAmount);
  }

  async finishGame(id: number, playerScore: number, bankScore: number): Promise<Game> {
    const game = await this.gameRepo.findById(id);
    if (!game) throw new NotFoundException('Game not found');

    game.playerScore = playerScore;
    game.bankScore = bankScore;

    if (playerScore > 21) {
      game.status = 'lost';
    } else if (bankScore > 21 || playerScore > bankScore) {
      game.status = 'won';
      await this.playerService.updateBalance(game.player.id, game.betAmount * 2);
    } else if (playerScore === bankScore) {
      game.status = 'push';
      await this.playerService.updateBalance(game.player.id, game.betAmount);
    } else {
      game.status = 'lost';
    }

    return await this.gameRepo.save(game);
  }

  async getGame(id: number): Promise<Game> {
    const game = await this.gameRepo.findById(id);
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }
}
