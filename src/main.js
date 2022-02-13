import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/css/tailwind.css";
import router from "@/router";
import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

createApp(App)
  .use(router)
  .use(VueChartkick)
  .component("PulseLoader", PulseLoader)
  .mount("#app");
