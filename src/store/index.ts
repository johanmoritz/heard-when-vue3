import { firestore } from "@/config/firebaseConfig";
import * as gameAction from "@/domain/action";
import * as gameApi from "@/services/game";
import { Commit, createStore } from "vuex";
import { Game, Card } from "../../firebase/functions/src/types";

interface State {
  username?: string;
  game?: Game;
  gameId?: string;
  cleanup?: () => Promise<void>;
  loading: boolean;
  error?: string;
}

const subscribeToGameChanges = (args: {
  gameId: string;
  onData: (d: Game) => void;
  onError: () => void;
}) => {
  const { gameId, onData, onError } = args;
  return firestore
    .collection("game")
    .doc(gameId)
    .onSnapshot(s => {
      const gameData = s.data() as Game | undefined;
      if (gameData !== undefined) {
        onData(gameData);
      }
    }, onError);
};

const UnspecifiedErrorMsg = "Try reloading the window.";

function runAsync<T>(commit: Commit, fn: () => Promise<T>): Promise<T | void> {
  commit("wait");
  return fn()
    .catch(() => commit("setError", "Something went wrong"))
    .finally(() => commit("stopWait"));
}

const store = createStore<State>({
  strict: process.env.NODE_ENV !== "production",
  state: { loading: false },
  mutations: {
    setUsername(state, name: string) {
      state.username = name;
    },
    setGame(state, g: Game) {
      state.game = g;
    },
    setGameId(state, id: string) {
      state.gameId = id;
    },
    setCleanup(state, cleanup: () => Promise<void>) {
      state.cleanup = cleanup;
    },
    wait(state) {
      state.loading = true;
    },
    stopWait(state) {
      state.loading = false;
    },
    setError(state, error) {
      state.error = error;
    }
  },
  actions: {
    rejoinGame({ commit }, gameId) {
      commit("setError", undefined);
      commit("setGameId", gameId);
      const unsubscribe = subscribeToGameChanges({
        gameId,
        onData: g => commit("setGame", g),
        onError: () => commit("setError", "Something went wrong.")
      });
      commit("setCleanup", unsubscribe);
    },
    initializeGame({ state, commit }, deck: Array<Card>) {
      commit("setError", undefined);
      const username = state.username;
      if (username === undefined) {
        commit("setError", UnspecifiedErrorMsg);
        return;
      }
      runAsync(commit, () =>
        gameApi.initialize({ displayName: username, deck }).then(gameId => {
          commit("setGameId", gameId);
          const unsubscribe = subscribeToGameChanges({
            gameId,
            onData: g => commit("setGame", g),
            onError: () => commit("setError", "Something went wrong.")
          });
          commit("setCleanup", unsubscribe);
        })
      );
    },
    startGame({ state, commit }) {
      commit("setError", undefined);
      const gameId = state.gameId;
      if (gameId === undefined) {
        commit("setError", UnspecifiedErrorMsg);
        return;
      }
      runAsync(commit, () => gameApi.start({ gameId }));
    },
    joinGame({ state, commit }, gameId: string) {
      commit("setError", undefined);
      const username = state.username;
      if (username === undefined) {
        commit("setError", UnspecifiedErrorMsg);
        return;
      }
      runAsync(commit, () =>
        gameApi.join({ gameId, displayName: username }).then(() => {
          const unsubscribe = subscribeToGameChanges({
            gameId,
            onData: g => commit("setGame", g),
            onError: () => commit("setError", "Something went wrong.")
          });
          commit("setCleanup", unsubscribe);
        })
      );
    },
    drawCard({ state, commit }) {
      commit("setError", undefined);
      const gameId = state.gameId;
      if (gameId === undefined) {
        commit("setError", UnspecifiedErrorMsg);
        return;
      }
      runAsync(commit, () =>
        gameApi.runAction({ gameId, action: gameAction.drawAction() })
      );
    },
    lockCards({ state, commit }) {
      commit("setError", undefined);
      const gameId = state.gameId;
      if (gameId === undefined) {
        commit("setError", UnspecifiedErrorMsg);
        return;
      }
      runAsync(commit, () =>
        gameApi.runAction({ gameId, action: gameAction.passAction() })
      );
    },
    guessCard({ state, commit }, guess: number) {
      commit("setError", undefined);
      const gameId = state.gameId;
      if (gameId === undefined) {
        commit("setError", UnspecifiedErrorMsg);
        return;
      }
      runAsync(commit, () =>
        gameApi.runAction({
          gameId,
          action: gameAction.guessAction({ hiddenCardPosition: guess })
        })
      );
    }
  },
  modules: {}
});

export default store;
export type Store = typeof store;
