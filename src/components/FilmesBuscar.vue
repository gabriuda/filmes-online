<template>
  <div>
    <form>
      <div class="search">
        <input
          type="text"
          placeholder="Buscar filme, ator/atriz..."
          v-model="termo"
        />
        <input type="submit" value="Buscar" @click.prevent="buscarFilmes" />
      </div>
    </form>
    <ul v-if="ativarSugestoes && sugestoes && sugestoes.results.length > 0">
      <li v-for="(filme, index) in sugestoes.results" :key="index">
        <router-link
          :to="{ name: 'filmes', params: { id: filme.id } }"
          v-if="filme.backdrop_path"
        >
          <p>{{ filme.title }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { tmdbApi, apiKey, language } from "@/services/index.js";

export default {
  name: "FilmesBuscar",
  data() {
    return {
      termo: "",
      ativarSugestoes: false,
      sugestoes: null,
    };
  },
  computed: {
    url() {
      return this.$route.query;
    },
  },
  methods: {
    buscarFilmes() {
      this.$store.dispatch("getFilmesBuscados", null);
      this.$router
        .push(`/pesquisar?query=${this.termo}&page=1`)
        .catch(() => {});
    },
    exibirSugestoes() {
      this.ativarSugestoes = true;
      tmdbApi
        .get(`/search/movie?query=${this.termo}&api_key=${apiKey}&${language}`)
        .then((response) => {
          this.sugestoes = response.data;
        });
    },
  },
  watch: {
    termo() {
      this.exibirSugestoes();
    },
    url() {
      this.ativarSugestoes = false;
    },
  },
  created() {
    const html = document.documentElement;
    html.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.ativarSugestoes = false;
      }
    });
  },
};
</script>

<style scoped>
.search input[type="text"] {
  padding: 18px;
}
@media screen and (max-width: 600px) {
  .search input[type="text"] {
    padding: 10px;
    font-size: 0.8rem;
  }
}

div {
  position: relative;
}

ul {
  position: absolute;
  z-index: 999;
  top: 100%;
  max-height: 50vh;
  overflow: auto;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 960px;
  background: var(--background);
  box-shadow: var(--shadow_hover);
}

ul li a {
  display: grid;
  gap: 10px;
  cursor: pointer;
  transition: 0.1s;
}

ul li a:hover {
  background: var(--azul);
}

ul li a p {
  font-size: 1rem;
  padding: 10px 15px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

@media screen and (max-width: 400px) {
  ul li a p {
    font-size: 0.8rem;
  }
}

::-webkit-scrollbar {
  width: 15px;
}

::-webkit-scrollbar-track {
  border: 2px solid var(--azul);
}

::-webkit-scrollbar-thumb {
  background: var(--azul);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--azul);
}
</style>