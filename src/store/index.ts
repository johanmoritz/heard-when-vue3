import { firestore, functions } from "@/config/firebaseConfig";
import * as gameAction from "@/domain/action";
import { createStore } from "vuex";
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
      commit("wait");
      return functions
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
        .catch(() => commit("setError", "Something went wrong"))
        .finally(() => commit("stopWait"));
    },
    startGame({ state, commit }) {
      if (state.gameId === undefined) {
        throw new Error("Game must be initialized");
      }
      commit("wait");
      return functions
        .httpsCallable("startGame")({ gameId: state.gameId })
        .catch(() => commit("setError", "Something went wrong"))
        .finally(() => commit("stopWait"));
    },
    joinGame({ state, commit }, gameId: string) {
      commit("wait");
      return functions
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
        .catch(() => commit("setError", "Something went wrong"))
        .finally(() => commit("stopWait"));
    },
    drawCard({ state, commit }) {
      commit("wait");
      return functions
        .httpsCallable("runAction")({
          gameId: state.gameId,
          action: gameAction.drawAction()
        })
        .catch(() => commit("setError", "Something went wrong"))
        .finally(() => commit("stopWait"));
    },
    lockCards({ state, commit }) {
      commit("wait");
      return functions
        .httpsCallable("runAction")({
          gameId: state.gameId,
          action: gameAction.passAction()
        })
        .catch(() => commit("setError", "Something went wrong"))
        .finally(() => commit("stopWait"));
    },
    guessCard({ state, commit }, guess: number) {
      commit("wait");
      return functions
        .httpsCallable("runAction")({
          gameId: state.gameId,
          action: gameAction.guessAction({ hiddenCardPosition: guess })
        })
        .catch(() => commit("setError", "Something went wrong"))
        .finally(() => commit("stopWait"));
    }
  },
  modules: {}
});

export default store;
export type Store = typeof store;
