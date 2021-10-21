<template>
  <transition mode="out-in">
    <section>
      <ul class="paginas">
        <li><router-link to="/">Início</router-link></li>
        <li><router-link to="/populares?page=1">Populares</router-link></li>
      </ul>
      <h1>Filmes Populares</h1>
      <FilmesPopulares />
    </section>
  </transition>
</template>

<script>
import FilmesPopulares from "@/components/filmes/FilmesPopulares.vue";

export default {
  name: "Populares",
  components: {
    FilmesPopulares,
  },
  created() {
    document.title = "Filmes Populares";
  },
};
</script>

<style scoped>
</style>