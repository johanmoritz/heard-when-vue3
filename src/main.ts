/* sources
https://www.youtube.com/watch?v=lOGFxzJzDfg
https://www.youtube.com/watch?v=FMPHvxqDrVk
https://weichie.com/blog/setting-up-vue-projects-with-vue-cli-vuex-routing-and-firebase/
https://blog.logrocket.com/vue-firebase-authentication/
https://www.freecodecamp.org/news/how-to-add-authentication-to-a-vue-app-using-firebase/
*/

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { auth } from "./config/firebaseConfig";

//state update of user in store
auth.onAuthStateChanged(user => {
  store.commit("updateUser", { user });
});

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
