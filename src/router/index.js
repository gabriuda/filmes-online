import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Categorias from "../views/Categorias.vue";
import Categoria from "../views/Categoria.vue";
import Filme from "../views/Filme.vue";
import Populares from "../views/Populares.vue";
import Copyright from "../views/Copyright.vue";
import PaginaNaoEncontrada from "../views/PaginaNaoEncontrada.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "PaginaNaoEncontrada",
    component: PaginaNaoEncontrada,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/populares",
    name: "Populares",
    component: Populares,
  },
  {
    path: "/categorias",
    name: "categorias",
    component: Categorias,
  },
  {
    path: "/categorias/:id",
    name: "categoria",
    component: Categoria,
    props: true,
  },
  {
    path: "/filme/:id",
    name: "filmes",
    component: Filme,
    props: true,
  },
  {
    path: "/copyright",
    name: "copyright",
    component: Copyright,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
});

export default router;
