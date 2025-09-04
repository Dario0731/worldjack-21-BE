import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { BankService } from '../services/bank.service';
import { Bank } from '../schema';

@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  async create(): Promise<Bank> {
    return await this.bankService.create();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Bank> {
    return await this.bankService.findById(id);
  }

  @Patch(':id/score')
  async updateScore(
    @Param('id') id: number,
    @Body() body: { score: number },
  ): Promise<Bank> {
    return await this.bankService.updateScore(id, body.score);
  }

  @Patch(':id/reset-score')
  async resetScore(@Param('id') id: number): Promise<Bank> {
    return await this.bankService.resetScore(id);
  }
}
