<template>
  <section>
    <transition mode="out-in">
      <div class="filmes-container">
        <div
          class="filme"
          v-for="(filme, index) in listaFilmes"
          :key="index"
          :class="{ ativo: filme.poster_path }"
        >
          <router-link :to="{ name: nomeLink, params: { id: filme.id } }">
            <b v-if="path !== '/tv'" class="filme-titulo">{{ filme.title }}</b>
            <b v-else class="filme-titulo">{{ filme.name }}</b>
            <img
              v-if="filme.poster_path"
              :src="filme.poster_path | filmeImagem"
              :alt="filme.title"
            />
            <p v-if="filme.release_date" class="filme-data">
              {{ filme.release_date.slice(0, 4) }}
            </p>
            <p v-else class="filme-data">
              {{ filme.first_air_date.slice(0, 4) }}
            </p>
          </router-link>
        </div>
      </div>
      <!-- <div v-else>
        <PageLoading />
      </div> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: "FilmesLista",
  props: ["listaFilmes"],
  computed: {
    path() {
      return this.$route.path;
    },
    nomeLink() {
      let nome = "";
      if (this.path === "/movie") {
        nome = "filmes";
      } else {
        nome = "series";
      }
      return nome;
    },
  },
};
</script>

<style scoped>
</style>