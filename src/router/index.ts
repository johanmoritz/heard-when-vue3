import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "@/components/Login/LoginPresenter.vue";
import Dashboard from "@/pages/DashBoard.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    redirect: "/"
  },
  {
    path: "/",
    name: "Home",
    component: Login
  },
  {
    path: "/me",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/play",
    name: "Play",
    component: () => import("../pages/Game.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
