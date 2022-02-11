import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Error from "@/views/Error.vue";
import CoinDetail from "@/views/CoinDetail.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/:catchAll(.*)",
    name: "Error",
    component: Error,
  },
  {
    path: "/coin/:id",
    name: "coin-detail",
    component: CoinDetail,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
