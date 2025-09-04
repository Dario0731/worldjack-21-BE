import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../schema';
import { Player } from '../schema';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly repo: Repository<Transaction>,
  ) {}

  async create(player: Player, amount: number, type: 'bet' | 'win' | 'lose' | 'deposit'): Promise<Transaction> {
    const tx = this.repo.create({ player, amount, type });
    return await this.repo.save(tx);
  }

  async findByPlayer(playerId: number): Promise<Transaction[]> {
    return await this.repo.find({
      where: { player: { id: playerId } },
      relations: ['player'],
      order: { createdAt: 'DESC' },
    });
  }
}
