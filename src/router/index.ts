import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
const PlumView = () => import("../views/PlumView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/plum",
      name: "plum",
      component: PlumView,
    },
  ],
});

export default router;
