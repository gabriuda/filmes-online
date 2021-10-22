<template>
  <section v-if="filmes">
    <FilmesComponente :listaFilmes="filmes" :carousel="true" nomeLink="movie" />
  </section>
</template>

<script>
import FilmesComponente from "@/components/filmes/FilmesComponente.vue";
import { tmdbApi, apiKey, language } from "@/services/index.js";

export default {
  name: "FilmesPopulares",
  data() {
    return {
      filmes: null,
    };
  },
  components: {
    FilmesComponente,
  },
  methods: {
    getFilmesPopulares() {
      tmdbApi
        .get(
          `/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&${language}`
        )
        .then((response) => (this.filmes = response.data))
        .catch(() => {});
    },
  },
  created() {
    this.getFilmesPopulares();
  },
};
</script>

<style scoped>
</style>