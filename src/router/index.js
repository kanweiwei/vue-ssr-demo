import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home.vue";

Vue.use(VueRouter);

export const createRouter = () => {
  return new VueRouter({
    mode: "history", // 不能使用 hash
    routes: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: "/about",
        name: "about",
        component: () => import("@/pages/About.vue"),
      },
      {
        path: "/articles",
        name: "articles",
        component: () => import("@/pages/Articles.vue"),
      },
    ],
  });
};
