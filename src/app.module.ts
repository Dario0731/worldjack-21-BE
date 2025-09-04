import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './modules/player.module'; 
import { Player } from './schema';
import { BankModule } from './modules/bank.module';
import { GameModule } from './modules/game.module';
import { TransactionModule } from './modules/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,       
      username: 'root', 
      password: '1234',
      database: 'blackjack',
      entities: [Player],
      synchronize: false,

    }),
    PlayerModule, BankModule, GameModule, TransactionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

