<template>
  <ul v-if="totalPages > 1">
    <li v-for="page in pages" :key="page">
      <router-link :to="{ query: query(page) }">{{ page }}</router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "FilmesPaginacao",
    props: {
      totalFilmes: {
        type: Number,
        default: 1
      },
      filmesPorPagina: {
        type: Number,
        default: 1
      }
    },
    computed: {
      pages() {
        const current = Number(this.$route.query.page);
        const range = 9;
        const offset = Math.ceil(range / 2);
        const total = this.totalFilmes;
        const pagesArray = [];
        for (let i = 1; i <= total; i++) {
          pagesArray.push(i);
        }
        pagesArray.splice(0, current - offset);
        pagesArray.splice((range < this.totalPages) ? range : this.totalPages, total);
        return pagesArray;
      },
      totalPages() {
        const total = this.totalFilmes / this.filmesPorPagina;
        return total !== Infinity ? Math.ceil(total) : 0;
      }
    },
    methods: {
      query(page) {
        return {
          ...this.$route.query,
          page
        };
      }
    }
  }
</script>

<style scoped>
 ul {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 40px;
  }
  li a {
    display: block;
    padding: 14px;
    font-family: 'Karla', sans-serif;
    font-size: 1rem;
    color: var(--branco);
    box-shadow: var(--shadow);
    transition: 0.2s;
    border: 2px solid transparent;
  }
  li a.router-link-exact-active,
  li a:hover {
    color: var(--branco);
    background: var(--azul);
    box-shadow: var(--shadow_hover);
    border: 2px solid var(--branco);

  }
  @media (max-width: 580px) {
    ul {
      padding: 20px;
      overflow-x: auto;
    }
  }
</style>