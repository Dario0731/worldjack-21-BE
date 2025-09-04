import { Injectable, NotFoundException } from '@nestjs/common';
import { GameRepository } from '../repositories/game.repository';
import { PlayerService } from '../services/player.service';
import { Bank, Game } from '../schema';
import { Card } from '../schema';

@Injectable()
export class GameService {
  private sessions = new Map<number, { deck: Card[]; playerHand: Card[]; bankHand: Card[] }>();

  constructor(
    private readonly gameRepo: GameRepository,
    private readonly playerService: PlayerService,
  ) { }

  private shuffle(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  private calculateScore(hand: Card[]): number {
    let score = 0;
    let aces = 0;
    for (const card of hand) {
      score += card.value;
      if (card.rank === 'A') aces++;
    }
    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }
    return score;
  }

  async startGame(playerId: string, betAmount: number): Promise<Game> {
    const player = await this.playerService.findByWorldId(playerId);
    if (!player) throw new NotFoundException('Player not found');

    if (player.balance < betAmount) throw new Error('Insufficient balance');
    await this.playerService.updateBalance(player.worldId, -betAmount);

    const deck = this.shuffle(Card.generateDeck());
    const playerHand = [deck.pop()!, deck.pop()!];
    const bankHand = [deck.pop()!];

    const playerScore = this.calculateScore(playerHand);
    const bankScore = this.calculateScore(bankHand);

    const bank = new Bank();
    bank.score = bankScore;

    const game = await this.gameRepo.create(player, betAmount, bank);
    game.playerScore = playerScore;
    game.bankScore = bankScore;
    game.bank = bank;
    await this.gameRepo.save(game);

    this.sessions.set(game.id, { deck, playerHand, bankHand });

    return game; 
  }

  async hit(gameId: number): Promise<Game> {
    const game = await this.gameRepo.findById(gameId);
    if (!game) throw new NotFoundException('Game not found');

    const session = this.sessions.get(gameId);
    if (!session) throw new Error('Session not found');

    const card = session.deck.pop();
    if (!card) throw new Error('No cards left in deck');

    session.playerHand.push(card);
    game.playerScore = this.calculateScore(session.playerHand);

    if (game.playerScore > 21) {
      game.status = 'lost';
    }

    await this.gameRepo.save(game);
    return game;
  }

  async stand(gameId: number): Promise<Game> {
    const game = await this.gameRepo.findById(gameId);
    if (!game) throw new NotFoundException('Game not found');

    const session = this.sessions.get(gameId);
    if (!session) throw new Error('Session not found');

    while (this.calculateScore(session.bankHand) < 17 && session.deck.length > 0) {
      session.bankHand.push(session.deck.pop()!);
    }

    game.playerScore = this.calculateScore(session.playerHand);
    game.bankScore = this.calculateScore(session.bankHand);

    if (game.playerScore > 21) {
      game.status = 'lost';
    } else if (game.bankScore > 21 || game.playerScore > game.bankScore) {
      game.status = 'won';
      await this.playerService.updateBalance(game.player.worldId, game.betAmount * 2);
    } else if (game.playerScore === game.bankScore) {
      game.status = 'push';
      await this.playerService.updateBalance(game.player.worldId, game.betAmount);
    } else {
      game.status = 'lost';
    }

    await this.gameRepo.save(game);
    this.sessions.delete(gameId); // liberar memoria

    return game;
  }

  async finishGame(id: number, playerScore: number, bankScore: number): Promise<Game> {
    const game = await this.gameRepo.findById(id);
    if (!game) throw new NotFoundException('Game not found');

    game.playerScore = playerScore;
    game.bankScore = bankScore;

    if (playerScore > 21) {
      game.status = 'lost';
    } else if (bankScore > 21 || playerScore > bankScore) {
      game.status = 'won';
      await this.playerService.updateBalance(game.player.worldId, game.betAmount * 2);
    } else if (playerScore === bankScore) {
      game.status = 'push';
      await this.playerService.updateBalance(game.player.worldId, game.betAmount);
    } else {
      game.status = 'lost';
    }

    return await this.gameRepo.save(game);
  }

  async getGame(id: number): Promise<Game> {
    const game = await this.gameRepo.findById(id);
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }
}
