<template>
  <transition mode="out-in">
    <section>
      <div v-if="filmesBuscados && filmesBuscados.results.length > 0">
        <div class="options">
          <p>
            Encontramos {{ filmesBuscados.total_results }} resultados para: "{{
              query
            }}"
          </p>
          <select class="btn select">
            <option value="a">Mais populares</option>
            <option value="a">Mais recentes</option>
            <option value="a">De A - Z</option>
            <option value="a">De Z - A</option>
          </select>
        </div>
        <transition mode="out-in">
          <div class="filmes-container" v-if="filmesBuscados">
            <div
              class="filme"
              v-for="(filme, index) in filmesBuscados.results"
              :key="index"
              :class="{ ativo: filme.backdrop_path }"
            >
              <router-link :to="{ name: 'filmes', params: { id: filme.id } }">
                <b class="filme-titulo">{{ filme.title }}</b>
                <img
                  v-if="filme.backdrop_path"
                  :src="filme.backdrop_path | filmeImagem"
                  :alt="filme.title"
                />
                <p v-if="filme.release_date" class="filme-data">
                  {{ filme.release_date.slice(0, 4) }}
                </p>
              </router-link>
            </div>
          </div>
        </transition>
        <div class="paginacao">
          <FilmesPaginacao :totalFilmes="filmesBuscados.total_pages" />
        </div>
      </div>
      <div v-else>
        <p>Busca sem resultados. Tente procurar por outro termo.</p>
      </div>
    </section>
  </transition>
</template>

<script>
import FilmesPaginacao from "@/components/FilmesPaginacao.vue";

export default {
  name: "FilmesFeed",
  components: {
    FilmesPaginacao,
  },
  computed: {
    url() {
      let queryString = "";
      for (let key in this.$route.query) {
        queryString += `&${key}=${this.$route.query[key]}`;
      }
      return queryString;
    },
    query() {
      return this.$route.query.query;
    },
    filmesBuscados() {
      return this.$store.state.filmesBuscados;
    },
  },
  watch: {
    url() {
      this.$store.commit("UPDATE_FILMES_BUSCADOS", null);
      this.$store.dispatch("getFilmesBuscados", this.url);
    },
  },
  created() {
    this.$store.dispatch("getFilmesBuscados", this.url);
  },
};
</script>

<style scoped>
p {
  margin: 30px 0;
}
.paginacao {
  display: flex;
  justify-content: center;
  margin: 30px auto 0;
  max-width: 600px;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn.select {
  position: initial;
}
</style>