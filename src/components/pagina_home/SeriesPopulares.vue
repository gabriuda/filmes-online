<template>
  <section v-if="serie">
    <FilmesComponente :listaFilmes="serie" :carousel="true" nomeLink="tv" />
  </section>
</template>

<script>
import FilmesComponente from "@/components/filmes/FilmesComponente.vue";
import { tmdbApi, apiKey, language } from "@/services/index.js";

export default {
  name: "SeriesPopulares",
  data() {
    return {
      serie: null,
    };
  },
  components: {
    FilmesComponente,
  },
  methods: {
    getSeriesPopulares() {
      tmdbApi
        .get(
          `/discover/tv?sort_by=popularity.desc&api_key=${apiKey}&${language}`
        )
        .then((response) => (this.serie = response.data))
        .catch(() => {});
    },
  },
  created() {
    this.getSeriesPopulares();
  },
};
</script>

<style scoped>
</style>