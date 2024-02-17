import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/compra-confirmada",
    name: "payment-confirmed",
    component: () =>
      import(
        /* webpackChunkName: "payment-confirmed" */ "../views/PaymentConfirmed.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
