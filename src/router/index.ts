import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
const PlumView = () => import("../views/PlumView.vue");
const NewMinesweeperView = () => import("../views/NewMinesweeperView.vue");

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
      path: "/new-minesweeper",
      name: "new-minesweeper",
      component: NewMinesweeperView,
    },
  ],
});

export default router;
