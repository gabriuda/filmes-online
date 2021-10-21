<template>
  <transition mode="out-in">
    <section v-if="data">
      <FilmesLista :listaFilmes="data.results" />
      <div class="paginacao" v-if="data">
        <FilmesPaginacao :totalFilmes="data.total_pages" />
      </div>
    </section>
    <div v-else>
      <PageLoading />
    </div>
  </transition>
</template>

<script>
import { tmdbApi, apiKey, language } from "@/services/index.js";
import FilmesPaginacao from "@/components/filmes/FilmesPaginacao.vue";
import FilmesLista from "@/components/filmes/FilmesLista.vue";

export default {
  name: "FeedContent",
  data() {
    return {
      data: null,
    };
  },
  components: {
    FilmesPaginacao,
    FilmesLista,
  },
  computed: {
    url() {
      let queryString = "";
      for (let key in this.$route.query) {
        queryString += `&${key}=${this.$route.query[key]}`;
      }
      return queryString;
    },
    path() {
      return this.$route.path;
    },
    query() {
      return this.$route.query.query;
    },
  },
  methods: {
    getData() {
      this.data = null;

      tmdbApi
        .get(`${this.path}/popular?api_key=${apiKey}&${language}${this.url}`)
        .then((response) => {
          this.data = response.data;
        });
    },
  },
  watch: {
    url() {
      this.getData();
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
</style>