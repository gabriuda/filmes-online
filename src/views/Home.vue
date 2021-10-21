<template>
  <div>
    <div class="logo">
      <img src="@/assets/logo-completa.svg" alt="OnlineFilmes" />
    </div>
    <FilmesBuscar />
    <div v-if="filmes">
      <h2 class="t-feed t-recentes">Mais populares</h2>
      <FilmesComponente :listaFilmes="filmes.lancamentos" :carousel="true" />
      <h2 class="t-feed t-recentes">Em Cartaz</h2>
      <FilmesComponente :listaFilmes="filmes.cartaz" :carousel="true" />
      <h2 class="t-feed t-recentes">Bem Avaliados</h2>
      <FilmesComponente :listaFilmes="filmes.top_rated" :carousel="true" />
    </div>
  </div>
</template>

<script>
import FilmesBuscar from "@/components/filmes/FilmesBuscar.vue";
import FilmesComponente from "@/components/filmes/FilmesComponente.vue";
import { tmdbApi, apiKey, language } from "@/services/index.js";

export default {
  name: "Home",
  data() {
    return {
      filmes: {
        lancamentos: null,
        cartaz: null,
        top_rated: null,
      },
    };
  },
  components: {
    FilmesBuscar,
    FilmesComponente,
  },
  computed: {
    query() {
      return this.$route.query.query;
    },
  },
  methods: {
    getLancamentos() {
      tmdbApi
        .get(
          `/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&${language}`
        )
        .then((response) => (this.filmes.lancamentos = response.data))
        .catch(() => {});
    },
    getCartaz() {
      tmdbApi
        .get(`/movie/now_playing?api_key=${apiKey}&${language}`)
        .then((response) => (this.filmes.cartaz = response.data))
        .catch(() => {});
    },
    getBemAvaliados() {
      tmdbApi
        .get(`/movie/top_rated?api_key=${apiKey}&${language}`)
        .then((response) => (this.filmes.top_rated = response.data))
        .catch(() => {});
    },
  },
  created() {
    document.title = "OnlineFilmes";
    this.getLancamentos();
    this.getCartaz();
    this.getBemAvaliados();
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 30px;
}

div {
  display: flex;
  flex-direction: column;
}

.logo {
  align-self: center;
  margin: 30px auto;
}

@media screen and (max-width: 600px) {
  .logo {
    max-width: 300px;
  }
}
</style>
