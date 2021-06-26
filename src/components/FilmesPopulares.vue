<template>
  <transition mode="out-in">
    <section v-if="filmesPopulares">
      <div class="filmes-container" v-if="filmesPopulares">
        <div class="filme" v-for="(filme, index) in filmesPopulares.results" :key="index" :class="{ ativo: filme.backdrop_path  }">
          <router-link :to="{ name: 'filmes', params: { id: filme.id } }">
            <b class="filme-titulo">{{ filme.title }}</b>
            <img v-if="filme.backdrop_path" :src="filme.backdrop_path | filmeImagem" :alt="filme.title">
            <PageLoading v-else />
            <p v-if="filme.release_date" class="filme-data">{{ filme.release_date.slice(0, 4) }}</p>
          </router-link>
        </div>
      </div>
      <div class="paginacao">
        <FilmesPaginacao :totalFilmes="filmesPopulares.total_pages" :filmesPorPagina="20" />
      </div>
    </section>
    <PageLoading v-else />
  </transition>
</template>

<script>
  import FilmesPaginacao from "@/components/FilmesPaginacao.vue";

  export default {
    name: "FilmesPopulares",
    components: {
      FilmesPaginacao
    },
    computed: {
      filmesPopulares() {
        return this.$store.state.filmesPopulares;
      },
      url() {
        let queryString = "";
        for (let key in this.$route.query) {
          queryString += `&${key}=${this.$route.query[key]}`;
        }
        return queryString;
      },
    },
    watch: {
      url() {
        this.$store.commit("UPDATE_FILMES_POPULARES", null);
        this.$store.dispatch("getFilmesPopulares", this.url);
      },
    },
    created() {
      this.$store.dispatch("getFilmesPopulares", this.url);
      this.$router.push({ query: { page: 1 } }).catch(() => {});
    }
  }
</script>

<style>
  .t-recentes {
    margin-top: 30px;
  }

  .paginacao {
    display: flex;
    justify-content: center;
    margin: 30px auto 0;
    max-width: 600px;
  }
</style>