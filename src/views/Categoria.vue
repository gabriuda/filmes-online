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
      <h1 v-if="!accAtivo">{{ categoriaNome }}</h1>
      <h1 v-else>Escolha</h1>
      <div class="opcoes-content">
        <transition>
          <div v-if="accAtivo">
            <ul class="acumulado">
              <li v-for="(categoria, index) in categorias.genres" :key="index">
                <input
                  type="checkbox"
                  :id="categoria.name"
                  name="categorias"
                  :value="categoria.id"
                  v-model="categoriaAcc"
                />
                <label :for="categoria.name">{{ categoria.name }}</label>
              </li>
            </ul>
          </div>
        </transition>
        <div class="acc">
          <label for="acc"><p>Acumular</p></label>
          <input type="checkbox" name="acc" id="acc" v-model="accAtivo" />
        </div>
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
        <div v-if="filmesDaCategoria.total_results === 0">
          <p>Sem resultados.</p>
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
      accAtivo: false,
      categoriaAcc: [],
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
              &api_key=${apiKey}&with_genres=${
              this.categoriaAcc.length ? this.categoriaAcc : this.idFilme
            }&${language}`
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
    categoriaAcc() {
      this.puxarFilmesECategorias();
    },
    accAtivo() {
      if (this.accAtivo === false) {
        while (this.categoriaAcc.length) {
          this.categoriaAcc.pop();
        }
      }
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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid var(--branco);
  padding-bottom: 10px;
  gap: 10px;
}

.opcoes h1 {
  border: none;
  flex: 1;
}

.btn {
  position: relative;
}

.opcoes-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 30px;
}

.acc {
  display: flex;
  align-items: center;
  gap: 10px;
}

.acc label {
  font-size: 0.9rem;
  cursor: pointer;
  padding: 10px 0;
}

.acumulado {
  display: flex;
  flex-wrap: wrap;
  max-width: 500px;
  gap: 6px;
}

.acumulado li label {
  padding: 4px 8px;
  border: 1px solid var(--branco);
  font-size: 0.8rem;
  font-family: "Karla", sans-serif;
  display: block;
  color: var(--branco);
  cursor: pointer;
  transition: 0.2s;
}

.acumulado li input {
  display: none;
}

.acumulado li input:checked ~ label,
.acumulado li label:hover {
  background: var(--azul);
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