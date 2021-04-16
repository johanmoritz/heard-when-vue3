import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/firebase",
    name: "Firebase",
    component: () => import("../views/FirebaseDemo.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    redirect: "/firebase"
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
