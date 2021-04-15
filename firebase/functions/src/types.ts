import { GameEvent } from "./event";

type FirebaseUid = string;
export type PlayerId = FirebaseUid;

export interface Card {
  id: number;
  title: string;
  artist: string;
  year: number;
  uri: string;
}

export interface Player {
  id: PlayerId;
  displayName: string;
  lockedCards: Array<Card>;
}

export type GamePhase =
  | "newTurn"
  | "choice"
  | "draw"
  | "pass"
  | "listen"
  | "evaluation";
export type GameStatus = "initialized" | "started" | "finished";

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
