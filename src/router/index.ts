import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../pages/login/index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../pages/main/Main.vue"),
  },
  {
    path: "/mvDetail",
    name: "MvDetail",
    component: () => import("../pages/mv-detail/index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
