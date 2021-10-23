<template>
  <section v-if="filmes">
    <FilmesComponente :listaFilmes="filmes" :carousel="true" nomeLink="movie" />
  </section>
</template>

<script>
import FilmesComponente from "@/components/filmes/FilmesComponente.vue";
import { tmdbApi, apiKey, language } from "@/services/index.js";

export default {
  name: "FilmesAclamados",
  data() {
    return {
      filmes: null,
    };
  },
  components: {
    FilmesComponente,
  },
  methods: {
    getFilmesAclamados() {
      tmdbApi
        .get(`/movie/top_rated?api_key=${apiKey}&${language}`)
        .then((response) => (this.filmes = response.data))
        .catch(() => {});
    },
  },
  created() {
    this.getFilmesAclamados();
  },
};
</script>

<style scoped>
</style>