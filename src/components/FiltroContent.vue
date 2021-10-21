<template>
  <div class="filtro">
    <ul>
      <li>
        <p>Categoria:</p>
        <select class="btn select" v-if="categorias" @change="mudarCategoria">
          <option
            v-for="(categoria, index) in categorias.genres"
            :value="categoria.id"
            :key="index"
          >
            {{ categoria.name }}
          </option>
        </select>
      </li>
    </ul>
  </div>
</template>

<script>
import { tmdbApi, apiKey, language } from "@/services/index.js";

export default {
  name: "FiltroContent",
  props: ["type"],
  data() {
    return {
      categorias: null,
      accAtivo: false,
      categoriaAcc: [],
    };
  },
  methods: {
    getCategorias() {
      console.log(this.$route.query.with_genres);

      tmdbApi
        .get(`/genre/movie/list?api_key=${apiKey}&${language}`)
        .then((response) => {
          this.categorias = response.data;
        });
    },
    mudarCategoria({ target }) {
      const id = +target.value;
      this.$router.replace({ query: this.queryGenres(id) });
    },
    queryGenres(with_genres) {
      return {
        ...this.$route.query,
        with_genres,
      };
    },
  },
  created() {
    this.getCategorias();
  },
};
</script>

<style scoped>
.filtro {
  margin: 20px 0 30px;
}

ul li {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>