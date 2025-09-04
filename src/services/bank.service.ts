import { Injectable, NotFoundException } from '@nestjs/common';
import { BankRepository } from '../repositories/bank.repository';
import { Bank } from '../schema';

@Injectable()
export class BankService {
  constructor(private readonly bankRepo: BankRepository) {}

  async create(): Promise<Bank> {
    return await this.bankRepo.createBank();
  }

  async findById(id: number): Promise<Bank> {
    const bank = await this.bankRepo.findById(id);
    if (!bank) throw new NotFoundException('Bank not found');
    return bank;
  }

  async updateScore(id: number, score: number): Promise<Bank> {
    const bank = await this.bankRepo.findById(id);
    if (!bank) throw new NotFoundException('Bank not found');
    bank.score = score;
    return await this.bankRepo.save(bank);
  }

  async resetScore(id: number): Promise<Bank> {
    const bank = await this.bankRepo.resetScore(id);
    if (!bank) throw new NotFoundException('Bank not found');
    return bank;
  }
}
