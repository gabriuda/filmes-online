<template>
  <transition mode="out-in">
    <section>
      <ul class="paginas">
        <li><router-link to="/">Início</router-link></li>
        <li><router-link to="/anime?page=1">Animes</router-link></li>
      </ul>
      <h1>Animes online e grátis</h1>
      <FiltroContent type="tv" />
      <transition mode="out-in">
        <section v-if="animes">
          <transition mode="out-in">
            <section v-if="animes.total_results > 0">
              <FilmesLista :listaFilmes="animes.results" nomeLink="tv" />
              <div class="paginacao">
                <FilmesPaginacao
                  :totalFilmes="animes.total_pages"
                  :filmesPorPagina="20"
                />
              </div>
            </section>
            <p v-else>Nenhum dado</p>
          </transition>
        </section>
      </transition>
    </section>
  </transition>
</template>

<script>
import FilmesPaginacao from "@/components/filmes/FilmesPaginacao.vue";
import FiltroContent from "@/components/FiltroContent.vue";
import FilmesLista from "@/components/filmes/FilmesLista.vue";
import { tmdbApi, apiKey, language } from "@/services/index.js";

export default {
  name: "Animes",
  components: {
    FiltroContent,
    FilmesLista,
    FilmesPaginacao,
  },
  data() {
    return {
      animes: null,
    };
  },
  computed: {
    url() {
      let queryString = "";
      for (let key in this.$route.query) {
        queryString += `&${key}=${this.$route.query[key]}`;
      }
      return queryString;
    },
    genreType() {
      return this.$route.query.with_genres;
    },
    page() {
      return this.$route.query.page;
    },
  },
  methods: {
    getAnimes() {
      this.animes = null;
      tmdbApi
        .get(
          `/discover/tv?sort_by=popularity.desc&with_genres=16${
            this.genreType ? "," + this.genreType : ""
          }${
            this.page ? "&page=" + this.page : ""
          }&api_key=${apiKey}&${language}`
        )
        .then((response) => {
          this.animes = response.data;
        })
        .catch(() => {});
    },
  },
  watch: {
    url() {
      this.getAnimes();
    },
  },
  created() {
    this.getAnimes();
  },
};
</script>

<style scoped>
</style>