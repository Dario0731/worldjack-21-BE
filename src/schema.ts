import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  worldId: string;

  @Column()
  username: string;

  @Column({ default: 1000 })
  balance: number;

  @Column({ default: true })
  isActive: boolean;

  constructor(worldId: string, username: string, balance: number = 1000) {
    this.worldId = worldId;
    this.username = username;
    this.balance = balance;
    this.isActive = true;
  }
}

@Entity('bank')
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  score: number;

  constructor(score: number = 0) {
    this.score = score;
  }
}

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player)
  player: Player;

  @Column()
  betAmount: number;

  @Column({ default: 0 })
  playerScore: number;

  @Column({ default: 0 })
  bankScore: number;

  @Column({ default: 'playing' })
  status: 'playing' | 'won' | 'lost' | 'push';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  constructor(player: Player, betAmount: number) {
    this.player = player;
    this.betAmount = betAmount;
    this.playerScore = 0;
    this.bankScore = 0;
    this.status = 'playing';
  }
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player)
  player: Player;

  @Column()
  amount: number;

  @Column()
  type: 'bet' | 'win' | 'lose' | 'deposit';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  constructor(player: Player, amount: number, type: 'bet' | 'win' | 'lose' | 'deposit') {
    this.player = player;
    this.amount = amount;
    this.type = type;
  }
}

export class Card {
  rank: string;
  suit: string;
  value: number;

  constructor(rank: string, suit: string, value: number) {
    this.rank = rank;
    this.suit = suit;
    this.value = value;
  }

  static generateDeck(): Card[] {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck: Card[] = [];

    for (const suit of suits) {
      for (const rank of ranks) {
        let value = 0;
        if (rank === 'A') value = 11;
        else if (['J', 'Q', 'K'].includes(rank)) value = 10;
        else value = parseInt(rank, 10);
        deck.push(new Card(rank, suit, value));
      }
    }
    return deck;
  }
}
