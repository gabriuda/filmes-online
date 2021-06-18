<template>
  <form>
    <div class="search">
      <input type="text" placeholder="Buscar filme..." v-model.lazy="termo">
      <input type="submit" value="Buscar" @click.prevent="buscarFilmes">
    </div>
  </form>
</template>

<script>
  export default {
    name: "FilmesBuscar",
    data() {
      return {
        termo: "",
      }
    },
    methods: {
      buscarFilmes() {
        this.$router.push({ query: { page: 1, query: this.termo } })
        .catch(() => {});
      }
    },
    watch: {
      termo() {
        this.buscarFilmes();
      }
    }
  }
</script>

<style scoped>
  .search input[type="text"] {
    padding: 18px;
  }
  @media screen and (max-width: 600px) {
    .search input[type="text"] {
      padding: 10px;
      font-size: .8rem;
    }
  }
</style>