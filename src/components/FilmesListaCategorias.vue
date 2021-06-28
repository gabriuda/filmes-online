<template>
  <div class="categorias-container" v-if="categorias">
    <div class="titulo">
      <h1>Categorias</h1>
      <CategoriasLetras :letras="letrasInicias" />
    </div>
    <div v-for="(categoria, key) in categorias.genres" :key="key">
      <transition mode="out-in">
        <div :class="{ desativo: letter && categoria.name.slice(0, 1) !== letter }">
          <div class="categorias-flex">
            <h3>{{ categoria.name }}</h3> 
            <router-link :to="{ name: 'categoria', params: { id: categoria.id, nome: categoria.name }, query: { page: 1 } }">
              <button class="btn">Ver mais</button>
            </router-link>
          </div>
          <FilmesDaCategoria :id="categoria.id" :carousel="true" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import CategoriasLetras from "./CategoriaLetras.vue";
  import FilmesDaCategoria from "./FilmesDaCategoria.vue";

  export default {
    name: "FilmesListaCategorias",
    components: {
      FilmesDaCategoria,
      CategoriasLetras
    },
    computed: {
      categorias() {
        return this.$store.state.categorias;
      },
      letter() {
        return this.$route.query.letter;
      },
      letrasInicias() {
        const arrayLetras = this.categorias.genres.map((categoria) => categoria.name.slice(0, 1));
        const arrayLetrasSemRepetidas = arrayLetras.filter((item, index) => {
          return arrayLetras.indexOf(item) === index;
        })
        return arrayLetrasSemRepetidas;
      }
    },
    created() {
      this.$store.dispatch("getCategorias");
    },
  }
</script>

<style scoped>
  .categorias-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
  }

  .titulo {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--branco);
  }

  h1 {
    border-bottom: none;
  }

  .desativo {
    display: none;
  }
</style>