import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { auth } from "./config/firebaseConfig";

/*auth.onAuthStateChanged(user => {
  store.commit("updateUser", { user });
});*/

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
