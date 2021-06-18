<template>
  <div>
    <div class="logo">
      <img src="@/assets/logo-completa.svg" alt="OnlineFilmes">
    </div>
    <FilmesBuscar />
    <div v-if="!query">
      <h2 class="t-feed t-recentes">Mais Populares</h2>
      <FilmesPopulares />
      <FilmesListaCategorias />
    </div>
    <FilmesFeed v-else />
  </div>
</template>

<script>
import FilmesBuscar from "@/components/FilmesBuscar.vue";
import FilmesPopulares from "@/components/FilmesPopulares.vue";
import FilmesListaCategorias from "@/components/FilmesListaCategorias.vue";
import FilmesFeed from "@/components/FilmesFeed.vue";

export default {
  name: "Home",
  components: {
    FilmesFeed,
    FilmesBuscar,
    FilmesPopulares,
    FilmesListaCategorias
  },
  computed: {
    query() {
      return this.$route.query.query;
    }
  },
  created() {
    document.title = "OnlineFilmes";
  }
}
</script>

<style scoped>
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
