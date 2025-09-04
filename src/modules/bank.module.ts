import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from '../schema';
import { BankRepository } from '../repositories/bank.repository';
import { BankService } from '../services/bank.service';
import { BankController } from '../controllers/bank.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Bank])],
  providers: [BankRepository, BankService],
  controllers: [BankController],
  exports: [BankService],
})
export class BankModule {}
