<template>
  <section>
    <ul class="paginas">
      <li><router-link to="/">Início</router-link></li>
      <li><router-link to="/categorias">Categorias</router-link></li>
    </ul>
    <FilmesListaCategorias />
  </section>
</template>

<script>
import FilmesListaCategorias from "@/components/FilmesListaCategorias.vue";

export default {
  name: "Categorias",
  components: {
    FilmesListaCategorias,
  },
  created() {
    document.title = "Categorias";
  },
};
</script>

<style>
</style>