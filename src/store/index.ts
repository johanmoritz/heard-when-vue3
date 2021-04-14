import { createStore } from "vuex";

const store = createStore({
  /*state: { person: null },
  mutations: {
    updateUser(state, { person }) {
      state.person = person;
    }
  },
  getters: {
    person: state => state.person
  },*/
  actions: {},
  modules: {}
});

export default store;
export type Store = typeof store;
