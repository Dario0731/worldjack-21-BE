/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './modules/player.module';
import { GameModule } from './modules/game.module';
import { TransactionModule } from './modules/transaction.module';
import { Bank, Game, Player, Transaction } from './schema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'admin',
      password: 'admin',
      database: 'blackjack',
      entities: [Player, Bank, Transaction, Game],
      synchronize: false,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    }),
    PlayerModule,
    GameModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
