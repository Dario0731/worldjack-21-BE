import { Injectable, NotFoundException } from '@nestjs/common';
import { Player } from '../schema';
import { PlayerRepository } from '../repositories/player.repository';

@Injectable()
export class PlayerService {
  constructor(private readonly playerRepo: PlayerRepository) {}

  async create(worldId: string, username: string): Promise<Player> {
    return await this.playerRepo.create(worldId, username);
  }

  async findByWorldId(worldId: string): Promise<Player | null> {
    return await this.playerRepo.findByWorldId(worldId);
  }

  async updateBalance(id: number, amount: number): Promise<Player> {
    const player = await this.playerRepo.findById(id);
    if (!player) throw new NotFoundException('Player not found');
    player.balance += amount;
    return await this.playerRepo.save(player);
  }

  async deactivate(id: number): Promise<Player> {
    const player = await this.playerRepo.findById(id);
    if (!player) throw new NotFoundException('Player not found');
    player.isActive = false;
    return await this.playerRepo.save(player);
  }

  async restartBalance(id: number): Promise<Player> {
    const player = await this.playerRepo.restartBalance(id);
    if (!player) throw new NotFoundException('Player not found');
    return player;
  }
}
