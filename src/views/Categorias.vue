<template>
  <section>
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
    }
  }
</script>

<style>

</style>