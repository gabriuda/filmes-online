<template>
  <transition mode="out-in">
    <div class="carousel-container">
      <FilmesComponente
        class="carousel-filmes"
        :listaFilmes="listaFilmes"
        :carousel="carousel"
      />
    </div>
  </transition>
</template>

<script>
import FilmesComponente from "@/components/filmes/FilmesComponente.vue";
import { tmdbApi } from "@/services/index.js";

export default {
  name: "FilmesCategorias",
  props: ["id", "carousel"],
  data() {
    return {
      listaFilmes: null,
    };
  },
  computed: {
    url() {
      return this.$route.path;
    },
  },
  components: {
    FilmesComponente,
  },
  methods: {
    async puxarFilmes() {
      this.listaFilmes = null;
      try {
        this.listaFilmes = await tmdbApi.getFilmesCategoria(this.id);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.puxarFilmes();
  },
  watch: {
    url() {
      this.puxarFilmes();
    },
  },
};
</script>

<style>
</style>