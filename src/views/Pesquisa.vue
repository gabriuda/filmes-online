<template>
  <section>
    <FilmesBuscar />
    <FilmesFeed />
  </section>
</template>

<script>
import FilmesBuscar from "@/components/filmes/FilmesBuscar.vue";
import FilmesFeed from "@/components/filmes/FilmesFeed.vue";

export default {
  name: "Pesquisa",
  components: {
    FilmesBuscar,
    FilmesFeed,
  },
};
</script>

<style scoped>
</style>