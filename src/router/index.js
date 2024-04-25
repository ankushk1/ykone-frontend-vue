import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import DetailsPage from "../pages/DetailsPage.vue";
import CreateClient from "../pages/CreateClient.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainPage
    },
    {
      path: "/details/:id",
      name: "details",
      component: DetailsPage
    },
    {
      path: "/create",
      name: "createClient",
      component: CreateClient
    }
  ]
});

export default router;
