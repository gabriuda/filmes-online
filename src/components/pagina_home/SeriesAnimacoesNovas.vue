<template>
  <section v-if="serie">
    <FilmesComponente :listaFilmes="serie" :carousel="true" nomeLink="tv" />
  </section>
</template>

<script>
import FilmesComponente from "@/components/filmes/FilmesComponente.vue";
import { tmdbApi, apiKey, language } from "@/services/index.js";

export default {
  name: "SeriesAnimacoesNovas",
  data() {
    return {
      serie: null,
    };
  },
  components: {
    FilmesComponente,
  },
  methods: {
    getSeriesAnimacoesNovas() {
      tmdbApi
        .get(
          `/discover/tv?with_genres=16&sort_by=first_air_date.desc&first_air_date_year=2021&api_key=${apiKey}&${language}`
        )
        .then((response) => (this.serie = response.data))
        .catch(() => {});
    },
  },
  created() {
    this.getSeriesAnimacoesNovas();
  },
};
</script>

<style scoped>
</style>