import { Controller, Post, Body, Patch, Get, Param } from '@nestjs/common';
import { GameService } from '../services/game.service';
import { Game } from '../schema';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('start')
  async startGame(
    @Body() body: { playerId: string; betAmount: number },
  ): Promise<Game> {
    return await this.gameService.startGame(body.playerId, body.betAmount);
  }

  @Patch(':id/hit')
  async hit(@Param('id') id: number): Promise<Game> {
    return await this.gameService.hit(id);
  }

  @Patch(':id/stand')
  async stand(@Param('id') id: number): Promise<Game> {
    return await this.gameService.stand(id);
  }

  @Patch(':id/finish')
  async finishGame(
    @Param('id') id: number,
    @Body() body: { playerScore: number; bankScore: number },
  ): Promise<Game> {
    return await this.gameService.finishGame(id, body.playerScore, body.bankScore);
  }

  @Get(':id')
  async getGame(@Param('id') id: number): Promise<Game> {
    return await this.gameService.getGame(id);
  }
}
