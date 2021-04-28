import { firestore, functions } from "@/config/firebaseConfig";
import * as gameAction from "@/domain/action";
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
      commit("setGameId", gameId);
      const unsubscribe = subscribeToGameChanges({
        gameId,
        onData: g => commit("setGame", g),
        onError: () => commit("setError", "Something went wrong.")
      });
      commit("setCleanup", unsubscribe);
    },
    initializeGame({ state, commit }, deck: Array<Card>) {
      runAsync(commit, () =>
        functions
          .httpsCallable("initializeGame")({
            displayName: state.username,
            deck
          })
          .then(response => {
            const gameId = response.data;
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
      if (state.gameId === undefined) {
        throw new Error("Game must be initialized");
      }
      runAsync(commit, () =>
        functions.httpsCallable("startGame")({ gameId: state.gameId })
      );
    },
    joinGame({ state, commit }, gameId: string) {
      runAsync(commit, () =>
        functions
          .httpsCallable("connectToGame")({
            gameId,
            displayName: state.username
          })
          .then(() => {
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
      runAsync(commit, () =>
        functions.httpsCallable("runAction")({
          gameId: state.gameId,
          action: gameAction.drawAction()
        })
      );
    },
    lockCards({ state, commit }) {
      runAsync(commit, () =>
        functions.httpsCallable("runAction")({
          gameId: state.gameId,
          action: gameAction.passAction()
        })
      );
    },
    guessCard({ state, commit }, guess: number) {
      runAsync(commit, () =>
        functions.httpsCallable("runAction")({
          gameId: state.gameId,
          action: gameAction.guessAction({ hiddenCardPosition: guess })
        })
      );
    }
  },
  modules: {}
});

export default store;
export type Store = typeof store;
