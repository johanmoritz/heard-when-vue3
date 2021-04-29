import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { ValidateEnvironment } from "./config";
import Btn from "./components/Btn.vue";

ValidateEnvironment();

createApp(App)
  .use(router)
  .use(store)
  .component("Btn", Btn)
  .mount("#app");
