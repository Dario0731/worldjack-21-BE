import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { PlayerService } from '../services/player.service';
import { Player } from '../schema';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async create(@Body() body: { worldId: string; username: string }): Promise<Player> {
    return await this.playerService.create(body.worldId, body.username);
  }

  @Get(':worldId')
  async findByWorldId(@Param('worldId') worldId: string): Promise<Player | null> {
    return await this.playerService.findByWorldId(worldId);
  }

  @Patch(':id/balance')
  async updateBalance(
    @Param('id') id: number,
    @Body() body: { amount: number },
  ): Promise<Player> {
    return await this.playerService.updateBalance(id, body.amount);
  }

  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: number): Promise<Player> {
    return await this.playerService.deactivate(id);
  }

  @Patch(':id/restart-balance')
  async restartBalance(@Param('id') id: number): Promise<Player> {
    return await this.playerService.restartBalance(id);
  }
}
