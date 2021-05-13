import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "@/components/Login/LoginPresenter.vue";
import Dashboard from "@/pages/DashBoard.vue";
import { data } from "@/store/user";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    redirect: "/"
  },
  {
    path: "/",
    name: "Home",
    component: Login,
    meta: { authRequired: false }
  },
  {
    path: "/me",
    name: "Dashboard",
    component: Dashboard,
    meta: { authRequired: true }
  },
  {
    path: "/play",
    name: "Play",
    component: () => import("../pages/Game.vue"),
    meta: { authRequired: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (data.user) {
      next();
      return;
    }
    next("/");
  }
  next();
});

export default router;
