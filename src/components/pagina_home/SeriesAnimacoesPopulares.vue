<template>
  <section v-if="serie">
    <FilmesComponente :listaFilmes="serie" :carousel="true" nomeLink="tv" />
  </section>
</template>

<script>
import FilmesComponente from "@/components/filmes/FilmesComponente.vue";
import { tmdbApi, apiKey, language } from "@/services/index.js";

export default {
  name: "SeriesAnimacoesPopulares",
  data() {
    return {
      serie: null,
    };
  },
  components: {
    FilmesComponente,
  },
  methods: {
    getSeriesAnimacoesPopulares() {
      tmdbApi
        .get(
          `/discover/tv?with_genres=16&sort_by=popularity.desc&api_key=${apiKey}&${language}`
        )
        .then((response) => (this.serie = response.data))
        .catch(() => {});
    },
  },
  created() {
    this.getSeriesAnimacoesPopulares();
  },
};
</script>

<style scoped>
</style>