import { createApp } from "vue";
import App from "./components/Layout/LayoutPresenter.vue";
import store from "./store";
import router from "./router";
import { ValidateEnvironment } from "./config";

ValidateEnvironment();

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
