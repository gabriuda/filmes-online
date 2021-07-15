<template>
  <section>
    <ul class="paginas">
      <li><router-link to="/">Início</router-link></li>
      <li><router-link to="/categorias">Categorias</router-link></li>
      <li>
        <router-link :to="`/categorias/${idFilme}?page=1`">{{
          categoriaNome
        }}</router-link>
      </li>
    </ul>
    <div class="opcoes">
      <h1>{{ categoriaNome }}</h1>
      <select class="btn select" v-if="categorias" @change="mudarRota">
        <option
          v-for="(categoria, index) in categorias.genres"
          :value="categoria.id"
          :key="index"
        >
          {{ categoria.name }}
        </option>
      </select>
    </div>
    <transition mode="out-in">
      <div v-if="filmesDaCategoria">
        <div class="filmes-container" v-if="filmesDaCategoria">
          <div
            class="filme"
            v-for="(filme, index) in filmesDaCategoria.results"
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
        <div class="paginacao">
          <FilmesPaginacao
            :totalFilmes="filmesDaCategoria.total_pages"
            :filmesPorPagina="20"
          />
        </div>
      </div>
      <PageLoading v-else />
    </transition>
  </section>
</template>

<script>
import FilmesPaginacao from "@/components/FilmesPaginacao.vue";
import { tmdbApi, apiKey, language } from "@/services/index.js";

export default {
  name: "Categoria",
  props: ["id"],
  components: {
    FilmesPaginacao,
  },
  data() {
    return {
      idFilme: this.id,
      filmesDaCategoria: null,
    };
  },
  computed: {
    categorias() {
      return this.$store.state.categorias;
    },
    pagina() {
      return this.$route.query.page;
    },
    categoriaNome() {
      let nome = "";
      if (this.categorias) {
        this.categorias.genres.forEach((item) => {
          if (+item.id === +this.id) nome = item.name;
        });
      }
      return nome;
    },
  },
  methods: {
    async puxarFilmesECategorias() {
      this.filmesDaCategoria = null;
      try {
        await this.$store.dispatch("getCategorias");
        tmdbApi
          .get(
            `/discover/movie?page=${this.pagina ? this.pagina : 1}
              &api_key=${apiKey}&with_genres=${this.idFilme}&${language}`
          )
          .then((response) => {
            this.filmesDaCategoria = response.data;
          });
        document.title = "Categoria - " + this.categoriaNome;
      } catch (err) {
        console.log(err);
      }
    },
    checkCurrentRouteAndRedirect(router, path) {
      const {
        currentRoute: { path: curPath },
      } = router;
      if (curPath !== path) router.push({ path }).catch(() => {});
    },
    mudarRota({ target }) {
      const id = +target.value;
      this.checkCurrentRouteAndRedirect(
        this.$router,
        `/categorias/${id}?page=1`
      );
      this.idFilme = id;
      this.puxarFilmesECategorias();
    },
  },
  watch: {
    pagina() {
      this.puxarFilmesECategorias();
    },
  },
  created() {
    document.title = "Categoria";
    this.puxarFilmesECategorias();
  },
};
</script>

<style scoped>
.filmes-container {
  margin: 30px 0;
}
.opcoes {
  position: relative;
}

.paginacao {
  display: flex;
  justify-content: center;
  margin: 30px auto 0;
  max-width: 600px;
}

@media screen and (max-width: 920px) {
  .btn {
    top: 0%;
  }
}

@media screen and (max-width: 600px) {
  h1 {
    font-size: 2rem;
  }
  .btn {
    font-size: 0.7rem;
    top: 0%;
    padding: 8px;
    background-size: 8px;
  }
}
</style>