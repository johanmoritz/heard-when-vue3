import { GameEvent } from "./event";

type FirebaseUid = string;
export type PlayerId = FirebaseUid;

export interface Card {
  id: number;
  title: string;
  artist: string;
  year: number;
}

export interface Player {
  id: PlayerId;
  displayName: string;
  lockedCards: Array<Card>;
}

export interface Guess {
}

export type GamePhase = 'newTurn' | 'choice' | 'draw' | 'listen' | 'evaluation';
export type GameStatus = 'initialized' | 'started' | 'finished';

export namespace GameDocument {
  export interface Game {
    deck: Array<Card>;
    goalNumberOfCards: number;
    players: Array<Player>;
    currentPlayer: Player;
    currentHiddenCard: Card | undefined;
    temporaryCards: Array<Card>;
    log: Array<GameEvent>;
    status: GameStatus;
    phase: GamePhase;
  }
}
