import { createStore } from "vuex";
import gameModule from "./game";

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    game: gameModule
  }
});

export default store;
export type Store = typeof store;
