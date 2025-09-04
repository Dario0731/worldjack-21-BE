import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank, Game } from '../schema';
import { Player } from '../schema';

@Injectable()
export class GameRepository {
  constructor(
    @InjectRepository(Game)
    private readonly repo: Repository<Game>,
  ) { }

  async create(player: Player, betAmount: number, bank: Bank): Promise<Game> {
    const game = this.repo.create({ player, betAmount, bank });
    return await this.repo.save(game);
  }
  async findById(id: number): Promise<Game | null> {
    return await this.repo.findOne({
      where: { id },
      relations: ['player', 'bank'],
    });
  }




  async save(game: Game): Promise<Game> {
    return await this.repo.save(game);
  }

  async updateStatus(id: number, status: 'playing' | 'won' | 'lost' | 'push'): Promise<Game | null> {
    const game = await this.findById(id);
    if (!game) return null;
    game.status = status;
    return await this.repo.save(game);
  }
}
