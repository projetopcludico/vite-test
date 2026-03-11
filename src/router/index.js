import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/game/:theme/:dificulty",
    name: "game",
    component: () => import('../views/GameView.vue'),
    beforeEnter: (to) => {
      const validThemes = ["forms", "sounds", "numbers"];
      const validDifficulties = ["easy", "medium", "hard"];

      if (!validThemes.includes(to.params.theme)) {
        return { name: "not-found" };
      }
      if (!validDifficulties.includes(to.params.dificulty)) {
        return { name: "not-found" };
      }
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
