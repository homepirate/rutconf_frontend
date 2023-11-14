import Main from "@/pages/Main.vue";
import { createRouter, createWebHistory } from "vue-router";
import ConfCreation from "@/pages/ConfCreation.vue";
import CallWindow from "@/pages/CallWindow.vue";
import ConfError from "@/pages/ConfError.vue";

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/create-call",
    component: ConfCreation,
  },
  {
    path: "/call/:call_url",
    component: CallWindow,
  },
  {
    path: "/conf-not-found",
    component: ConfError,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
