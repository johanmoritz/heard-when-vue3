import { UserAction } from "./action";
import {
  GameEvent,
  drawEvent,
  correctEvent,
  nextEvent,
  finnishEvent,
  wrongEvent,
} from "./event";
import { GameDocument, GamePhase, Player, PlayerId } from "./types";

/**
 * Determines who the next player is.
 */
export function playerInTurn(state: GameDocument.Game): Player {
  const numberOfPlayers = state.players.length;
  const currentPlayerIndex = state.players.findIndex(
    ({ id }) => id === state.currentPlayer.id
  );
  const nextPlayerIndex = (currentPlayerIndex + 1) % numberOfPlayers;
  return state.players[nextPlayerIndex];
}

/**
 * Evaluates whether or not a guess is correct.
 */
export function successfulGuess(): boolean {
  // const { guess, state } = args;

  // TODO:
  return true;
}

export function stepGameStateMachine(args: {
  symbol: GameEvent | UserAction;
  status: GamePhase;
}): GamePhase | undefined {
  const { symbol, status } = args;

  type TransitionTable = Record<
    GamePhase,
    Partial<Record<(GameEvent | UserAction)["_tag"], GamePhase>>
  >;

  const validTransitions: TransitionTable = {
    newTurn: {
      nextEvent: "choice",
    },
    choice: {
      drawAction: "draw",
      passAction: "newTurn",
    },
    draw: {
      drawEvent: "listen",
    },
    listen: {
      guessAction: "evaluation",
    },
    evaluation: {
      wrongEvent: "newTurn",
      correctEvent: "newTurn",
    },
  };

  return validTransitions[status][symbol._tag];
}

/**
 * Transforms a user action into an appropriate event.
 */
export function eventsFromAction(args: {
  action: UserAction;
  state: GameDocument.Game;
}): Array<GameEvent> {
  const { action, state } = args;

  switch (action._tag) {
    case "drawAction": {
      return [drawEvent({ card: state.deck[0] })];
    }
    case "guessAction": {
      return successfulGuess() ? [correctEvent()] : [wrongEvent()];
    }
    case "passAction": {
      // TODO: add a SaveEvent and non-saved cards
      return state.deck.length > 0
        ? [nextEvent({ from: state.currentPlayer, to: playerInTurn(state) })]
        : [finnishEvent()];
    }
  }
}

/**
 * Evaluates a new state based on the old state and an event.
 */
export function handleEvent(args: {
  event: GameEvent;
  state: GameDocument.Game;
}): [GameDocument.Game, GameEvent?] {
  const { event, state } = args;

  const gameIsFinished =
    state.status === "finished" || (state.phase === "newTurn" && hasWinner());

  if (gameIsFinished) {
    return [{ ...state, status: "finished" }];
  }

  const newPhase = stepGameStateMachine({ symbol: event, status: state.phase });
  if (newPhase === undefined) {
    throw "Event not allowed. Should not happen.";
  }

  switch (event._tag) {
    case "nextEvent": {
      return [{ ...state, currentPlayer: event.next, phase: newPhase }];
    }
    case "drawEvent": {
      const deck = state.deck.filter(({ id }) => id !== event.card.id);
      return [{ ...state, deck, phase: newPhase }];
    }
    case "correctEvent": {
      return [{ ...state, phase: newPhase }];
    }
    case "wrongEvent": {
      return [{ ...state, phase: newPhase }];
    }
    case "finnishEvent": {
      return [{ ...state, phase: newPhase }];
    }
  }
}

export function player(args: {id: PlayerId; displayName: string}): Player {
  const {id, displayName} = args;
  return {id, displayName, lockedCards: []}
}

export function winners(args: {game: GameDocument.Game}) {
  const goal = args.game.goalNumberOfCards;
  return args.game.players.filter(({lockedCards}) => lockedCards.length >= goal);
}

export function hasWinner(args: {game: GameDocument.Game}) {
  return winners({game: args.game}).length > 0;
}

function insert<T>(val: T, at: number, arr: Array<T>): Array<T> {
  if (arr.length === 0) {
    return [val];
  }

  return arr.slice(0, at).concat([val], arr.slice(at));
}

export function executeEvents(args: {
  events: Array<GameEvent>;
  game: GameDocument.Game;
}) {
  // Note the mutability here
  let { events, game } = args;
  let event: GameEvent | undefined = undefined;

  for (let i = 0; i < events.length; i += 1) {
    [game, event] = handleEvent({
      event: events[i],
      state: game,
    });
    if (event !== undefined) {
      events = insert(event, i + 1, events);
    }
  }
  game.log = game.log.concat(events);
  return game;
}
