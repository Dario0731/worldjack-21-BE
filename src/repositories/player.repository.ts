import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../schema';

@Injectable()
export class PlayerRepository {
  constructor(
    @InjectRepository(Player)
    private readonly repo: Repository<Player>,
  ) {}

  async create(worldId: string, username: string, balance = 1000): Promise<Player> {
    const player = this.repo.create({ worldId, username, balance });
    return await this.repo.save(player);
  }

  async findByWorldId(worldId: string): Promise<Player | null> {
    return await this.repo.findOne({ where: { worldId } });
  }

  async save(player: Player): Promise<Player> {
    return await this.repo.save(player);
  }

  async restartBalance(id: string): Promise<Player | null> {
    const player = await this.findByWorldId(id);
    if (!player) return null;
    player.balance = 1000;
    return await this.repo.save(player);
  }
}
