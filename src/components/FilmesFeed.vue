<template>
  <transition mode="out-in">
    <section>
      <div
        v-if="
          (filmesBuscados || elencoBuscado) &&
          (filmesBuscados.results.length > 0 ||
            elencoBuscado.results.length > 0)
        "
      >
        <div class="opcoes">
          <p>Resultados para: "{{ query }}"</p>
          <ul class="escolher">
            <li>
              <input
                type="radio"
                id="filmes"
                name="conteudo"
                :value="1"
                v-model="conteudo"
                checked
              />
              <label for="filmes"
                >Filmes ({{ filmesBuscados.total_results }})</label
              >
            </li>
            <li>
              <input
                type="radio"
                id="elenco"
                name="conteudo"
                :value="2"
                v-model="conteudo"
                checked
              />
              <label for="elenco"
                >Ator/Atriz ({{ elencoBuscado.total_results }})</label
              >
            </li>
          </ul>
        </div>
        <transition mode="out-in">
          <div class="filmes-container" v-if="filmesBuscados && conteudo === 1">
            <div
              class="filme"
              v-for="(filme, index) in filmesBuscados.results"
              :key="index"
              :class="{ ativo: filme.poster_path }"
            >
              <router-link :to="{ name: 'filmes', params: { id: filme.id } }">
                <b class="filme-titulo">{{ filme.title }}</b>
                <img
                  v-if="filme.poster_path"
                  :src="filme.poster_path | filmeImagem"
                  :alt="filme.title"
                />
                <p v-if="filme.release_date" class="filme-data">
                  {{ filme.release_date.slice(0, 4) }}
                </p>
              </router-link>
            </div>
          </div>
          <div v-else-if="conteudo === 2">
            <ElencoFeed />
          </div>
        </transition>
        <div class="paginacao" v-if="filmesBuscados && conteudo === 1">
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
import ElencoFeed from "@/components/ElencoFeed.vue";

export default {
  name: "FilmesFeed",
  data() {
    return {
      conteudo: 1,
    };
  },
  components: {
    FilmesPaginacao,
    ElencoFeed,
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
    elencoBuscado() {
      return this.$store.state.elencoBuscado;
    },
  },
  watch: {
    url() {
      this.$store.commit("UPDATE_FILMES_BUSCADOS", null);
      this.$store.dispatch("getFilmesBuscados", this.url);
      this.$store.commit("UPDATE_ELENCO_BUSCADO", null);
      this.$store.dispatch("getElencoBuscado", this.url);
    },
  },
  created() {
    this.$store.dispatch("getFilmesBuscados", this.url);
    this.$store.dispatch("getElencoBuscado", this.url);
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

.btn.select {
  position: initial;
}

.opcoes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0px 30px;
  margin: 30px 0;
}

.escolher {
  display: flex;
  flex-wrap: wrap;
  max-width: 500px;
  margin-bottom: 20px;
}

.escolher li input {
  display: none;
}

.escolher li label {
  font-family: "Karla", sans-serif;
  font-size: 0.9rem;
  display: block;
  width: 130px;
  height: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--azul);
  color: var(--branco);
  transition: 0.2s;
  padding: 4px;
  opacity: 0.75;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.escolher li input:checked ~ label,
label:hover {
  opacity: 1;
  border-color: var(--branco);
}

@media screen and (max-width: 549px) {
  .opcoes {
    margin: 0px 0;
  }
}
</style>