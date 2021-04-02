import { GameEvent } from "./event";

type FirebaseUid = string;
export type PlayerId = FirebaseUid;

export interface Card {
  id: number;
  releaseYear: number;
}

export type Deck = Array<Card>;

export interface Player {
  id: PlayerId;
  displayName: string;
  lockedCards: Array<Card>;
}

export interface EventQueue {
  queue: Array<GameEvent>;
  consumedCount: number;
  consumed: boolean;
}

export interface Guess {}

export type GamePhase = 'newTurn' | 'choice' | 'draw' | 'listen' | 'evaluation';
export type GameStatus = 'initialized' | 'started' | 'finished';

export namespace GameDocument {
  export interface Game {
    deck: Deck;
    goalNumberOfCards: number;
    players: Array<Player>;
    currentPlayer: Player;
    currentHiddenCard: Card | undefined;
    log: Array<GameEvent>;
    status: GameStatus;
    phase: GamePhase;
  }
}
