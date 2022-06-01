import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "../views/HomeView.vue";

const views = import.meta.glob("../views/*.vue");

const routes: RouteRecordRaw[] = [];

Object.keys(views).forEach((path) => {
  // 取文件名
  const fileName = path.split("/").pop();
  if (!fileName) return;
  const name =
    fileName.substring(0, 1).toLowerCase() +
    fileName
      .substring(1)
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .replace("-view.vue", "");
  if (name === "home") {
    routes.push({
      path: "/",
      name,
      component: HomeView,
    });
  } else {
    routes.push({
      path: `/${name}`,
      name,
      component: views[path],
    });
  }
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
