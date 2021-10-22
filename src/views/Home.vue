<template>
  <div>
    <div class="logo">
      <img src="@/assets/logo-completa.svg" alt="OnlineFilmes" />
    </div>
    <FilmesBuscar />
    <div v-if="filmes">
      <div class="titulo-flex">
        <h2 class="t-recentes">Filmes mais populares</h2>
        <router-link :to="{ name: 'Filmes' }" class="btn">Ver mais</router-link>
      </div>
      <FilmesPopulares />
      <div class="titulo-flex">
        <h2 class="t-recentes">Séries mais assistidas</h2>
        <router-link :to="{ name: 'Series' }" class="btn">Ver mais</router-link>
      </div>
      <SeriesPopulares />
      <h2 class="t-feed t-recentes">Bem Avaliados</h2>
      <FilmesComponente :listaFilmes="filmes.top_rated" :carousel="true" />
    </div>
  </div>
</template>

<script>
import FilmesBuscar from "@/components/filmes/FilmesBuscar.vue";
import FilmesPopulares from "@/components/pagina_home/FilmesPopulares.vue";
import SeriesPopulares from "@/components/pagina_home/SeriesPopulares.vue";
import FilmesComponente from "@/components/filmes/FilmesComponente.vue";
import { tmdbApi, apiKey, language } from "@/services/index.js";

export default {
  name: "Home",
  data() {
    return {
      filmes: {
        top_rated: null,
      },
    };
  },
  components: {
    FilmesBuscar,
    FilmesPopulares,
    SeriesPopulares,
    FilmesComponente,
  },
  computed: {
    query() {
      return this.$route.query.query;
    },
  },
  methods: {
    getBemAvaliados() {
      tmdbApi
        .get(`/movie/top_rated?api_key=${apiKey}&${language}`)
        .then((response) => (this.filmes.top_rated = response.data))
        .catch(() => {});
    },
  },
  created() {
    document.title = "OnlineFilmes";
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

.titulo-flex {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  border-bottom: 1px solid var(--branco);
  margin-bottom: 20px;
}

.t-recentes {
  margin-bottom: 20px;
}
</style>
