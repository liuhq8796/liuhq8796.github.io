import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
const PlumView = () => import("../views/PlumView.vue");
const MinesweeperView = () => import("../views/MinesweeperView.vue");
const GoogleLogoView = () => import("../views/GoogleLogoView.vue");

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
      path: "/google-logo",
      name: "google-logo",
      component: GoogleLogoView,
    },
  ],
});

export default router;
