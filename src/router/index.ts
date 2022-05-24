import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
const PlumView = () => import("../views/PlumView.vue");
const MinesweeperView = () => import("../views/MinesweeperView.vue");
const FontFamily = () => import("../views/FontFamily.vue");

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
    {
      path: "/minesweeper",
      name: "minesweeper",
      component: MinesweeperView,
    },
    {
      path: "/font-family",
      name: "font-family",
      component: FontFamily,
    },
  ],
});

export default router;
