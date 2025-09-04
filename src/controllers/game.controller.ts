import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { GameService } from '../services/game.service';
import { Game } from '../schema';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('start')
  async startGame(@Body() body: { playerId: string; betAmount: number }): Promise<Game> {
    return await this.gameService.startGame(body.playerId, body.betAmount);
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
