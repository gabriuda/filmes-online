<template>
  <section v-if="serie">
    <FilmesComponente :listaFilmes="serie" :carousel="true" nomeLink="tv" />
  </section>
</template>

<script>
import FilmesComponente from "@/components/filmes/FilmesComponente.vue";
import { tmdbApi, apiKey, language } from "@/services/index.js";

export default {
  name: "SeriesAclamadas",
  data() {
    return {
      serie: null,
    };
  },
  components: {
    FilmesComponente,
  },
  methods: {
    getSeriesAclamadas() {
      tmdbApi
        .get(
          `/discover/tv?sort_by=vote_average.desc&without_genres=16&first_air_date_year=2021&page=2&api_key=${apiKey}&${language}`
        )
        .then((response) => (this.serie = response.data))
        .catch(() => {});
    },
  },
  created() {
    this.getSeriesAclamadas();
  },
};
</script>

<style scoped>
</style>