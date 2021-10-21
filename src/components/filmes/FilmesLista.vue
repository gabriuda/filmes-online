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
            <div class="filme-titulo">
              <b>{{ filme.title }}</b>
              <b>{{ filme.name }}</b>
            </div>
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
  props: ["listaFilmes", "nomeLink"],
};
</script>

<style scoped>
</style>