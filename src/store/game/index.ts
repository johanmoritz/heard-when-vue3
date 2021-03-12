import { Module } from "vuex";
import {
  GameActions,
  GameMutations,
  GameState,
  GameStore,
  Mutation
} from "./types";

const state: GameState = {
  playerInTurnIndex: 0,
  deck: [],
  players: [],
  currentHiddenCard: undefined,
  tempCards: [],
  goalNumberOfCards: 10,
  ended: false
};

const mutations: GameMutations<GameState> = {
  drawCard(state) {
    const card = state.deck.pop();
    state.currentHiddenCard = card;
  },
  correctGuess(state, { guessIndex }) {
    if (!state.currentHiddenCard) {
      throw new Error("This shouldn't happen");
    }
    state.tempCards.splice(guessIndex, 0, state.currentHiddenCard);
    state.tempCards.join();
    state.currentHiddenCard = undefined;
  },
  wrongGuess(state) {
    state.tempCards = [];
    state.playerInTurnIndex =
      (state.playerInTurnIndex + 1) % state.players.length;
  },
  win(state) {
    state.ended = true;
  },
  lockCards(state) {
    state.players[state.playerInTurnIndex].lockedCards = state.tempCards;
    state.tempCards = [];
    state.playerInTurnIndex =
      (state.playerInTurnIndex + 1) % state.players.length;
  }
};

const actions: GameActions<GameState> = {
  guess({ commit, state }, { guessIndex }) {
    if (state.currentHiddenCard === undefined) {
      throw new Error("This should not happen.");
    }
    if (state.currentHiddenCard.year <= state.tempCards[guessIndex].year) {
      commit(Mutation.correctGuess, { guessIndex });
      if (state.tempCards.length === state.goalNumberOfCards) {
        commit(Mutation.win, undefined);
      }
    } else {
      commit(Mutation.wrongGuess, undefined);
    }
  }
};

const module: Module<GameState, {}> = {
  state,
  mutations,
  actions
};

export default module;
export { GameState, GameStore };
