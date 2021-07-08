<template>
  <section>
    <FilmesBuscar />
    <FilmesFeed />
  </section>
</template>

<script>
import FilmesBuscar from "@/components/FilmesBuscar.vue";
import FilmesFeed from "@/components/FilmesFeed.vue";

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