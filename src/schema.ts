import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  worldId: string; // Identificador del usuario en World App

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

  @Column('simple-array', { nullable: true })
  hand: string[];

  constructor(score: number = 0, hand: string[] = []) {
    this.score = score;
    this.hand = hand;
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

  @Column('simple-array', { nullable: true })
  playerHand: string[];

  @Column({ default: 0 })
  playerScore: number;

  @Column('simple-array', { nullable: true })
  bankHand: string[];

  @Column({ default: 0 })
  bankScore: number;

  @Column({
    default: 'playing',
  })
  status: 'playing' | 'won' | 'lost' | 'push';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  constructor(player: Player, betAmount: number) {
    this.player = player;
    this.betAmount = betAmount;
    this.playerHand = [];
    this.bankHand = [];
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
  amount: number; // positivo = gana, negativo = pierde

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
