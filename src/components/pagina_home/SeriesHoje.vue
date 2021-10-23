<template>
  <section v-if="serie">
    <FilmesComponente :listaFilmes="serie" :carousel="true" nomeLink="tv" />
  </section>
</template>

<script>
import FilmesComponente from "@/components/filmes/FilmesComponente.vue";
import { tmdbApi, apiKey, language } from "@/services/index.js";

export default {
  name: "SeriesHoje",
  data() {
    return {
      serie: null,
    };
  },
  components: {
    FilmesComponente,
  },
  methods: {
    getSeriesHoje() {
      tmdbApi
        .get(`/tv/airing_today?api_key=${apiKey}&${language}`)
        .then((response) => (this.serie = response.data))
        .catch(() => {});
    },
  },
  created() {
    this.getSeriesHoje();
  },
};
</script>

<style scoped>
</style>