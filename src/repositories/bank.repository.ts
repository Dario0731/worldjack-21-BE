import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from '../schema';

@Injectable()
export class BankRepository {
  constructor(
    @InjectRepository(Bank)
    private readonly repo: Repository<Bank>,
  ) {}

  async createBank(): Promise<Bank> {
    const bank = this.repo.create({ score: 0 });
    return await this.repo.save(bank);
  }

  async findById(id: number): Promise<Bank | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async save(bank: Bank): Promise<Bank> {
    return await this.repo.save(bank);
  }

  async resetScore(id: number): Promise<Bank | null> {
    const bank = await this.findById(id);
    if (!bank) return null;
    bank.score = 0;
    return await this.repo.save(bank);
  }
}
