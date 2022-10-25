import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./view/HomePages/HomeLay.vue"),
  },
  {
    path: "/faucet",
    name: "Faucet",
    component: () => import("./view/FaucetPage/FaucetIndex.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

 // {
                //     "t_key": "faucet",
                //     "link": "/faucet",
                //     "inner": true
                // }