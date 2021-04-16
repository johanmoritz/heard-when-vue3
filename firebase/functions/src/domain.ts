import { UserAction } from "./action";
import {
  GameEvent,
  drawEvent,
  correctEvent,
  nextEvent,
  finnishEvent,
  wrongEvent,
  passEvent,
} from "./event";
import { Game, GamePhase, Player, PlayerId } from "./types";

/**
 * Determines who the next player is.
 */
export function playerInTurn(state: Game): Player {
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
export function successfulGuess(args: {
  hiddenCardPosition: number;
  state: Game;
}): boolean {
  const { hiddenCardPosition, state } = args;

  const cardBefore = state.temporaryCards[hiddenCardPosition - 1];
  const cardAfter = state.temporaryCards[hiddenCardPosition + 1];

  const hidden = state.currentHiddenCard;
  if (hidden === undefined) {
    // We've done something wrong here
    return false;
  }

  const isAfterBeforeCard =
    cardBefore === undefined || cardBefore.year - hidden.year <= 0;
  const isBeforeAfterCard =
    cardAfter === undefined || cardAfter.year - hidden.year >= 0;
    
  return isAfterBeforeCard && isBeforeAfterCard;
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
      finnishEvent: "newTurn",
    },
    pass: {
      passEvent: "newTurn",
    },
    choice: {
      drawAction: "draw",
      passAction: "pass",
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
  state: Game;
}): Array<GameEvent> {
  const { action, state } = args;

  switch (action._tag) {
    case "drawAction": {
      return [drawEvent({ card: state.deck[0] })];
    }
    case "guessAction": {
      const { hiddenCardPosition } = action;
      return successfulGuess({ hiddenCardPosition, state })
        ? [correctEvent({ hiddenCardPosition })]
        : [wrongEvent({ hiddenCardPosition })];
    }
    case "passAction": {
      return [passEvent()];
    }
  }
}

/**
 * Evaluates a new state based on the old state and an event.
 */
export function handleEvent(args: {
  event: GameEvent;
  state: Game;
}): Game {
  const { event, state } = args;

  const newPhase = stepGameStateMachine({ symbol: event, status: state.phase });
  if (newPhase === undefined) {
    throw "Event not allowed. Should not happen.";
  }

  const newLog = state.log.concat(event);

  switch (event._tag) {
    case "nextEvent": {
      const newPlayer = event.next.id !== event.current.id;
      const temporaryCards = newPlayer
        ? event.next.lockedCards
        : state.temporaryCards;
      return {
        ...state,
        currentPlayer: event.next,
        phase: newPhase,
        log: newLog,
        temporaryCards,
      };
    }
    case "drawEvent": {
      const deck = state.deck.filter(({ id }) => id !== event.card.id);
      return {
        ...state,
        deck,
        currentHiddenCard: event.card,
        phase: newPhase,
        log: newLog,
      };
    }
    case "passEvent": {
      const currentPlayerIndex = state.players.findIndex(
        ({ id }) => id === state.currentPlayer.id
      );
      const savedPlayer = {
        ...state.players[currentPlayerIndex],
        lockedCards: state.temporaryCards,
      };
      const newPlayers = update(savedPlayer, currentPlayerIndex, state.players);

      return {
        ...state,
        phase: newPhase,
        log: newLog,
        players: newPlayers,
        temporaryCards: [],
      };
    }
    case "correctEvent": {
      const newTemporaryCards = insert(
        state.currentHiddenCard!,
        event.hiddenCardPosition,
        state.temporaryCards
      );
      return {
        ...state,
        phase: newPhase,
        log: newLog,
        temporaryCards: newTemporaryCards,
      };
    }
    case "wrongEvent": {
      return { ...state, phase: newPhase, log: newLog };
    }
    case "finnishEvent": {
      const currentPlayerIndex = state.players.findIndex(
        ({ id }) => id === state.currentPlayer.id
      );
      const savedPlayer = {
        ...state.players[currentPlayerIndex],
        lockedCards: state.temporaryCards,
      };
      const newPlayers = update(savedPlayer, currentPlayerIndex, state.players);

      return {
        ...state,
        phase: newPhase,
        players: newPlayers,
        log: newLog,
        status: "finished",
      };
    }
  }
}

export function player(args: { id: PlayerId; displayName: string }): Player {
  const { id, displayName } = args;
  return { id, displayName, lockedCards: [] };
}

export function winners(args: { game: Game }) {
  const goal =
    args.game.deck.length === 0
      ? Math.max(
          ...args.game.players.map(({ lockedCards }) => lockedCards.length)
        )
      : args.game.goalNumberOfCards;
  return args.game.players.filter(
    ({ lockedCards }) => lockedCards.length >= goal
  );
}

export function hasWinner(args: { game: Game }) {
  return winners({ game: args.game }).length > 0;
}

function insert<T>(val: T, at: number, arr: Array<T>): Array<T> {
  if (arr.length === 0) {
    return [val];
  }

  return arr.slice(0, at).concat([val], arr.slice(at));
}

function update<T>(val: T, at: number, arr: Array<T>): Array<T> {
  if (arr.length === 0) {
    return [val];
  }

  const updatedArr = arr.slice(0, at).concat([val], arr.slice(at + 1));

  if (updatedArr.length !== arr.length) {
    throw new Error("Different lengths should not happen");
  }

  return updatedArr;
}

function randomReal(args: { min: number; max: number }): number {
  const { min, max } = args;
  return Math.random() * (max - min) + min;
}

function randomInt(args: { min: number; max: number }): number {
  return Math.floor(randomReal(args));
}

export function randomPlayer(args: { game: Game }) {
  const players = args.game.players;
  const numberOfPlayers = players.length;
  const i = randomInt({ min: 0, max: numberOfPlayers });
  return players[i];
}

function evaluateState(args: {
  state: Game;
}): GameEvent | undefined {
  if (args.state.phase !== "newTurn" || args.state.status !== "started") {
    return undefined;
  }

  if (hasWinner({ game: args.state })) {
    return finnishEvent();
  }

  const lastEvent: GameEvent | undefined =
    args.state.log[args.state.log.length - 1];
  console.log("lastEvent", lastEvent);
  if (lastEvent?._tag === "correctEvent") {
    return nextEvent({
      from: args.state.currentPlayer,
      to: args.state.currentPlayer,
    });
  } else if (
    lastEvent?._tag === "wrongEvent" ||
    lastEvent?._tag === "passEvent"
  ) {
    return nextEvent({
      from: args.state.currentPlayer,
      to: playerInTurn(args.state),
    });
  } else {
    return undefined;
  }
}

export function executeEvents(args: {
  events: Array<GameEvent>;
  game: Game;
}) {
  // Note the mutability here
  let { events, game } = args;

  for (let i = 0; i < events.length; i += 1) {
    game = handleEvent({
      event: events[i],
      state: game,
    });
    const event: GameEvent | undefined = evaluateState({ state: game });
    if (event !== undefined) {
      events = insert(event, i + 1, events);
    }
  }
  return game;
}
