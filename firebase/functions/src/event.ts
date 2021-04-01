import { Card, Player } from "./types";

interface NextEvent {
  _tag: "nextEvent";
  current: Player;
  next: Player;
}
interface DrawEvent {
  _tag: "drawEvent";
  card: Card;
}
interface CorrectEvent {
  _tag: "correctEvent";
}
interface WrongEvent {
  _tag: "wrongEvent";
}
interface FinnishEvent {
  _tag: "finnishEvent";
}

export type GameEvent = 
  | NextEvent
  | DrawEvent
  | CorrectEvent
  | WrongEvent
  | FinnishEvent;

/**
 * @return {NextEvent}
 */
export function nextEvent(args: { from: Player; to: Player }): NextEvent {
  return { _tag: "next", current: args.from, next: args.to };
}

/**
 * @return {DrawEvent}
 */
export function drawEvent(args: {card: Card}): DrawEvent {
  return { _tag: "draw", card: args.card };
}

/**
 * @return {CorrectEvent}
 */
export function correctEvent(): CorrectEvent {
  return { _tag: "correct" };
}

/**
 * @return {WrongEvent}
 */
export function wrongEvent(): WrongEvent {
  return { _tag: "wrong" };
}

/**
 * @return {FinnishEvent}
 */
export function finnishEvent(): FinnishEvent {
  return { _tag: "finnish" };
}
