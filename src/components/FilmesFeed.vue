<template>
  <transition mode="out-in">
    <section>
      <div v-if="filmesBuscados && filmesBuscados.results.length > 0">
        <div class="opcoes">
          <p>
            Encontramos {{ filmesBuscados.total_results }} resultados para: "{{
              query
            }}"
          </p>
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
              <label for="filmes">Filmes</label>
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
              <label for="elenco">Ator/Atriz</label>
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
            <p>cui</p>
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

  <!-- 
    Fazer listas com atores e filmes para escolher, tipo Conecta Oi
    | Filme | Ator/Atriz | -> tab
   -->
</template>

<script>
import FilmesPaginacao from "@/components/FilmesPaginacao.vue";

export default {
  name: "FilmesFeed",
  data() {
    return {
      conteudo: 1,
    };
  },
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
  display: block;
  width: 120px;
  height: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--azul);
  color: var(--branco);
  transition: 0.2s;
  opacity: 0.75;
  cursor: pointer;
}

.escolher li input:checked ~ label,
label:hover {
  opacity: 1;
  border-color: var(--branco);
}
</style>