import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import Login from "../components/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/firebase",
    name: "Firebase",
    component: () => import("../views/FirebaseDemo.vue"),
    meta: { authRequired: true }
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
/*
router.beforeEach((to, from, next) => {
  if (to.matched.some(routeRecord => routeRecord.meta.authRequired)) {
    if (!store.state.person) {
      next({
        path: "/",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});*/

export default router;
