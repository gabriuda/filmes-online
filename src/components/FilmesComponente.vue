<template>
  <transition mode="out-in" v-if="carousel && listaFilmes">
    <carousel
      :responsive="{
        0: { items: 1 },
        300: { items: 2 },
        600: { items: 3 },
        1000: { items: 4 },
      }"
      :nav="false"
      :dots="false"
      :margin="20"
      class="filmes-carousel"
      v-if="carousel && listaFilmes"
    >
      <template slot="prev"><span class="prev"></span></template>
      <div
        class="filme"
        v-for="(filme, index) in listaFilmes.results"
        :key="index"
        :class="{ ativo: filme.poster_path }"
      >
        <router-link :to="{ name: 'filmes', params: { id: filme.id } }">
          <b class="filme-titulo">{{ filme.title }}</b>
          <img
            v-if="filme.poster_path"
            :src="filme.poster_path | filmeImagem"
            :alt="filme.title"
          />
          <p v-if="filme.release_date" class="filme-data">
            {{ filme.release_date.slice(0, 4) }}
          </p>
        </router-link>
      </div>
      <template slot="next"><span class="next"></span></template>
    </carousel>
    <div class="filmes-container" v-else-if="!carousel && listaFilmes">
      <div
        class="filme"
        v-for="(filme, index) in listaFilmes.results"
        :key="index"
        :class="{ ativo: filme.backdrop_path }"
      >
        <router-link :to="{ name: 'filmes', params: { id: filme.id } }">
          <b class="filme-titulo">{{ filme.title }}</b>
          <img
            v-if="filme.backdrop_path"
            :src="filme.backdrop_path | filmeImagem"
            :alt="filme.title"
          />
          <p v-if="filme.release_date" class="filme-data">
            {{ filme.release_date.slice(0, 4) }}
          </p>
        </router-link>
      </div>
    </div>
    <PageLoading v-else />
  </transition>
</template>

<script>
import carousel from "vue-owl-carousel";

export default {
  name: "FilmesComponente",
  props: ["listaFilmes", "carousel"],
  components: {
    carousel,
  },
};
</script>

<style>
.filmes-container {
  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-gap: 30px;
  justify-items: start;
}

.filme {
  max-width: 300px;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: 0.2s;
  border: 2px solid transparent;
}

.filme:hover {
  box-shadow: var(--shadow_hover);
  border-color: var(--azul);
}

.filme-titulo {
  position: absolute;
  padding: 10px;
  background: var(--azul);
  color: var(--branco);
  font-family: "Karla", sans-serif;
  font-size: 0.9rem;
  width: 100%;
  text-align: center;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.filme img {
  height: 360px;
  object-fit: cover;
}

.filme-data {
  position: absolute;
  bottom: 5%;
  left: 10px;
  background: rgba(0, 0, 0, 0.6);
  padding: 6px 10px;
  color: var(--branco);
  font-family: "Karla", sans-serif;
}

@media screen and (max-width: 600px) {
  .filmes-container {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }
  .filme-titulo {
    padding: 5px;
    font-size: 0.735rem;
  }
  .filme-data {
    font-size: 0.9rem;
    bottom: 3%;
  }
  .filme img {
    height: 230px;
  }
}

@media screen and (max-width: 460px) {
  .filme img {
    height: 200px;
  }
  .filme-data,
  .filme-titulo {
    font-size: 0.735rem;
    padding: 4px;
  }
}

.filmes-carousel {
  display: block;
  position: relative;
  margin: 0px 0 30px;
}

.prev {
  background: rgba(0, 0, 0, 0.7) url("../assets/prev.svg") no-repeat center
    center;
}

.next {
  background: rgba(0, 0, 0, 0.7) url("../assets/next.svg") no-repeat center
    center;
}

.prev,
.next {
  width: 30px;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 100;
  transition: 0.2s;
  cursor: pointer;
  background-size: 12px;
}

.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.next {
  right: 0;
}
</style>