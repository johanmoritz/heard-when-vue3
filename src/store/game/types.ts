import { ActionTree, MutationTree } from "vuex";
import {
  ActionWithPayload,
  MutationWithoutPayload,
  MutationWithPayload,
  Store
} from "../types";

export interface State {
  playerInTurnIndex: number;
  goalNumberOfCards: number;
  deck: Array<Card>;
  players: Array<Player>;
  tempCards: Array<Card>;
  currentHiddenCard: Card | undefined;
  ended: boolean;
}

export interface Player {
  displayName: string;
  lockedCards: Array<Card>;
}

export interface Card {
  title: string;
  artist: string;
  year: number;
}

/**
 * Used to 'commit' game mutations
 */
export enum Mutation {
  drawCard = "drawCard",
  correctGuess = "correctGuess",
  wrongGuess = "wrongGuess",
  win = "win",
  lockCards = "lockCards"
}

/**
 * Used to 'dispatch' game actions
 */
export enum Action {
  guess = "guess"
}

// A bit of boilerplate to type check
// mutations/actions

type Mutations<State> = {
  [Mutation.drawCard]: MutationWithoutPayload<State>;
  [Mutation.correctGuess]: MutationWithPayload<State, { guessIndex: number }>;
  [Mutation.wrongGuess]: MutationWithoutPayload<State>;
  [Mutation.win]: MutationWithoutPayload<State>;
  [Mutation.lockCards]: MutationWithoutPayload<State>;
};

type Actions<State> = {
  [Action.guess]: ActionWithPayload<
    Mutations<State>,
    State,
    {},
    { guessIndex: number }
  >;
};

// We use MutationTree and ActionTree to validate our types against the official vuex api
export type GameMutations<State> = MutationTree<State> & Mutations<State>;
export type GameActions<State> = ActionTree<State, {}> & Actions<State>;

export type GameState = State;
export type GameStore<State> = Store<State, Mutations<State>, Actions<State>>;
