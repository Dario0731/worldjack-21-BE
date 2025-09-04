import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';
import { PlayerService } from '../services/player.service';
import { Transaction } from '../schema';

@Injectable()
export class TransactionService {
  constructor(
    private readonly txRepo: TransactionRepository,
    private readonly playerService: PlayerService,
  ) {}

  async recordTransaction(playerId: string, amount: number, type: 'bet' | 'win' | 'lose' | 'deposit'): Promise<Transaction> {
    const player = await this.playerService.findByWorldId(playerId);
    if (!player) throw new NotFoundException('Player not found');
    return await this.txRepo.create(player, amount, type);
  }

  async getTransactionsByPlayer(playerId: number): Promise<Transaction[]> {
    return await this.txRepo.findByPlayer(playerId);
  }
}
