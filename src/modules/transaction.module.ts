import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../schema';
import { TransactionRepository } from '../repositories/transaction.repository';
import { TransactionService } from '../services/transaction.service';
import { TransactionController } from '../controllers/transaction.controller';
import { PlayerModule } from './player.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), PlayerModule],
  providers: [TransactionRepository, TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService],
})
export class TransactionModule {}
