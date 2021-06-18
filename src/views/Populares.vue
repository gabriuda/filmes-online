<template>
  <transition mode="out-in">
    <div>
      <h1>Filmes Populares</h1>
      <FilmesPopulares />
    </div>
  </transition>
</template>

<script>
  import FilmesPopulares from "@/components/FilmesPopulares.vue";

  export default {
    name: "Populares",
    components: {
      FilmesPopulares
    },
    created() {
      document.title = "Filmes Populares";
    }
  }
</script>

<style scoped>

</style>