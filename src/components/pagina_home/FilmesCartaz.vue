<template>
  <section v-if="filmes">
    <FilmesComponente :listaFilmes="filmes" :carousel="true" nomeLink="movie" />
  </section>
</template>

<script>
import FilmesComponente from "@/components/filmes/FilmesComponente.vue";
import { tmdbApi, apiKey, language } from "@/services/index.js";

export default {
  name: "FilmesCartaz",
  data() {
    return {
      filmes: null,
    };
  },
  components: {
    FilmesComponente,
  },
  methods: {
    getFilmesCartaz() {
      tmdbApi
        .get(`/movie/upcoming?api_key=${apiKey}&${language}`)
        .then((response) => (this.filmes = response.data))
        .catch(() => {});
    },
  },
  created() {
    this.getFilmesCartaz();
  },
};
</script>

<style scoped>
</style>