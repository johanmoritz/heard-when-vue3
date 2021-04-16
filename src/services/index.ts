import Pizzly from "pizzly-js";
import { environment } from "@/config";

export const oAuth = new Pizzly({
  host: environment().VUE_APP_PIZZLY_HOST,
  publishableKey: environment().VUE_APP_PIZZLY_PUBLIC_KEY
});
