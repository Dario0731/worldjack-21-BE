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

  async findById(id: number): Promise<Player | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async findByWorldId(worldId: string): Promise<Player | null> {
    return await this.repo.findOne({ where: { worldId } });
  }

  async save(player: Player): Promise<Player> {
    return await this.repo.save(player);
  }

  async restartBalance(id: number): Promise<Player | null> {
    const player = await this.findById(id);
    if (!player) return null;
    player.balance = 1000;
    return await this.repo.save(player);
  }
}
