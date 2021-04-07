import { createStore } from "vuex";

//persist user to store
const store = createStore({
  state: {
    user: null
  },
  mutations: {
    updateUser(state, { user }) {
      state.user = user;
    }
  },
  getters: {
    user: state => state.user
  }
});

export default store;
export type Store = typeof store;
