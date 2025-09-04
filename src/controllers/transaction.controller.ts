import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../schema';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly txService: TransactionService) {}

  @Post()
  async record(
    @Body() body: { playerId: string; amount: number; type: 'bet' | 'win' | 'lose' | 'deposit' },
  ): Promise<Transaction> {
    return await this.txService.recordTransaction(body.playerId, body.amount, body.type);
  }

  @Get('player/:id')
  async findByPlayer(@Param('id') id: number): Promise<Transaction[]> {
    return await this.txService.getTransactionsByPlayer(id);
  }
}
