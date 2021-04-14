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

interface PassEvent {
  _tag: "passEvent";
}
interface CorrectEvent {
  _tag: "correctEvent";
  // [0, temporaryCards + 1]
  hiddenCardPosition: number;
}
interface WrongEvent {
  _tag: "wrongEvent";
  hiddenCardPosition: number;
}
interface FinnishEvent {
  _tag: "finnishEvent";
}

export type GameEvent = 
  | NextEvent
  | DrawEvent
  | PassEvent
  | CorrectEvent
  | WrongEvent
  | FinnishEvent;

/**
 * @return {NextEvent}
 */
export function nextEvent(args: { from: Player; to: Player }): NextEvent {
  return { _tag: "nextEvent", current: args.from, next: args.to };
}

/**
 * @return {DrawEvent}
 */
export function drawEvent(args: {card: Card}): DrawEvent {
  return { _tag: "drawEvent", card: args.card };
}

/**
 * @return {PassEvent}
 */
export function passEvent(): PassEvent {
  return { _tag: "passEvent" };
}



/**
 * @return {CorrectEvent}
 */
export function correctEvent(args: {hiddenCardPosition: number}): CorrectEvent {
  return { _tag: "correctEvent", hiddenCardPosition: args.hiddenCardPosition };
}

/**
 * @return {WrongEvent}
 */
export function wrongEvent(args: {hiddenCardPosition: number}): WrongEvent {
  return { _tag: "wrongEvent", hiddenCardPosition: args.hiddenCardPosition };
}

/**
 * @return {FinnishEvent}
 */
export function finnishEvent(): FinnishEvent {
  return { _tag: "finnishEvent" };
}
