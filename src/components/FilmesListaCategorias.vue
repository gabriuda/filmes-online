<template>
  <div class="categorias-container" v-if="categorias">
    <h1>Categorias</h1>
    <div v-for="(categoria, key) in categorias.genres" :key="key">
      <div class="categorias-flex">
        <h3>{{ categoria.name }}</h3>
        <router-link :to="{ name: 'categoria', params: { id: categoria.id, nome: categoria.name }, query: { page: 1 } }">
          <button class="btn">Ver mais</button>
        </router-link>
      </div>
      <FilmesDaCategoria :id="categoria.id" :carousel="true" />
    </div>
  </div>
</template>

<script>
  import FilmesDaCategoria from "./FilmesDaCategoria.vue";

  export default {
    name: "FilmesListaCategorias",
    components: {
      FilmesDaCategoria,
    },
    computed: {
      categorias() {
        return this.$store.state.categorias;
      }
    },
    created() {
      this.$store.dispatch("getCategorias");
    },
  }
</script>

<style scoped>
  .categorias-container {
    margin: 60px 0;
  }
  .categorias-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
  }
</style>