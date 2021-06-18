<template>
  <transition mode="out-in">
    <FilmesComponente :listaFilmes="listaFilmes" :carousel="carousel" />
  </transition>
</template>

<script>
  import FilmesComponente from "./FilmesComponente.vue";
  import { tmdbApi } from "@/services/index.js";
  
  export default {
    name: "FilmesCategorias",
    props: ["id", "carousel"],
    data() {
      return {
        listaFilmes: null,
      }
    },
    computed: {
      url() {
        return this.$route.path;
      }
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
          console.log(error)
        }
      }
    },
    created() {
      this.puxarFilmes();
    },
    watch: {
      url() {
        this.puxarFilmes();
      }
    }
  }

  // Consertar data
</script>

<style>
</style>