import { createRouter, createWebHashHistory } from "vue-router";
import HomeCheckout from "../views/HomeCheckout.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeCheckout,
  },
  {
    path: "/compra-confirmada",
    name: "order-placed",
    component: () =>
      import(/* webpackChunkName: "order-placed" */ "../views/OrderPlaced.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
