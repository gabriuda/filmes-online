import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import PageLoading from "@/components/PageLoading.vue";
import store from "./store";

Vue.config.productionTip = false;

Vue.component("PageLoading", PageLoading);

Vue.filter("filmeImagem", (backdrop_path) => {
  return `http://image.tmdb.org/t/p/w1280${backdrop_path}`;
});

Vue.filter("convertTime", (time) => {
  const hours = Math.floor(time / 60);
  const mins = time % 60;
  return `${hours}h ${mins}m`;
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
