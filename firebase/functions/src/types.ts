import { firestore } from "firebase-admin";
import { GameEvent } from "./event";

type PlayerId = string;

export interface Card {
  id: number;
  releaseYear: number;
}

export interface Player {
  id: PlayerId;
}

export interface State {
  deck: Array<Card>;
  players: Array<Player>;
  currentPlayer: Player;
  eventQueue: EventQueue;
  eventLog: ReadonlyArray<GameEvent>;
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
    deck: Array<Card>;
    players: Array<Player>;
    currentPlayer: Player;
    log: Array<GameEvent>;
    status: GameStatus;
    phase: GamePhase;
  }
}
