import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    redirect: "/"
  },
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: { authRequired: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

//before routing, take unauthorized user to login page, or allow continue if authorized
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.user) {
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
});

export default router;
