import { MutationTree } from "vuex";

const gameModule = {
  state: {
    playerInTurnIndex: 0,
    deck: [],
    players: [],
    currentHiddenCard: undefined,
    tempCards: [],
    goalNumberOfCards: 10,
    ended: false
  } as State,
  mutations: {
    drawCard(state: State) {
      const card = state.deck.pop();
      state.currentHiddenCard = card;
    },
    correctGuess(state: State, { guessIndex }: { guessIndex: number }) {
      if (!state.currentHiddenCard) {
        throw new Error("This shouldn't happen");
      }
      state.tempCards.splice(guessIndex, 0, state.currentHiddenCard);
      state.tempCards.join();
      state.currentHiddenCard = undefined;
    },
    wrongGuess(state: State) {
      state.tempCards = [];
      state.playerInTurnIndex =
        (state.playerInTurnIndex + 1) % state.players.length;
    },
    win(state: State) {
      state.ended = true;
    },
    lockCards(state: State) {
      state.players[state.playerInTurnIndex].lockedCards = state.tempCards;
      state.tempCards = [];
      state.playerInTurnIndex =
        (state.playerInTurnIndex + 1) % state.players.length;
    }
  },
  actions: {
    guess({ commit, state }, { guessIndex }) {
      if (state.currentHiddenCard.year <= state.tempCards[guessIndex].year) {
        commit("correctGuess", guessIndex);
        if (state.tempCards.length === state.goalNumberOfCards) {
          commit("win");
        }
      } else {
        commit("wrongGuess");
      }
    }
  }
};

export default gameModule;

interface State {
  playerInTurnIndex: number;
  goalNumberOfCards: number;
  deck: Array<Card>;
  players: Array<Player>;
  tempCards: Array<Card>;
  currentHiddenCard: Card | undefined;
  ended: boolean;
}

interface Player {
  displayName: string;
  lockedCards: Array<Card>;
}

interface Card {
  title: string;
  artist: string;
  year: number;
}
