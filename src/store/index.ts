import { createStore } from "vuex";
import game, { GameState, GameStore } from "./game";

// ** To add more modules to the store: **

// 1. Add the modules state type
interface State {
  game: GameState;
}

// 2. Add the rest of your modules type
// by appending: & MyStore<Pick<State, "myStoreName">>
export type Store = GameStore<Pick<State, "game">>;

// 3. Add the actual code
const store = createStore<State>({
  modules: {
    game
  }
});

export default store;
