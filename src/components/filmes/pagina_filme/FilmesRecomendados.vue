<template>
  <section>
    <h2 class="t-feed">Talvez você goste também</h2>
    <FilmesComponente
      v-if="listaRecomendados"
      :listaFilmes="listaRecomendados"
      :carousel="true"
      :nomeLink="nomeLink"
    />
    <p v-else>Nenhuma recomendação</p>
  </section>
</template>

<script>
import FilmesComponente from "@/components/filmes/FilmesComponente.vue";
import { tmdbApi, apiKey, language } from "@/services/index.js";

export default {
  name: "FilmesRecomendados",
  props: ["id", "nomeLink"],
  data() {
    return {
      listaRecomendados: null,
    };
  },
  components: {
    FilmesComponente,
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
  methods: {
    puxarRecomendacoes() {
      tmdbApi
        .get(`${this.path}/recommendations?api_key=${apiKey}&${language}`)
        .then((response) => {
          this.listaRecomendados = response.data;
        });
    },
  },
  created() {
    this.puxarRecomendacoes();
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>