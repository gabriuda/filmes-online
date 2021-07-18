<template>
  <transition mode="out-in" v-if="carousel && listaFilmes">
    <carousel
      :responsive="{
        600: { items: 3 },
        1000: { items: 5 },
      }"
      :nav="false"
      :dots="false"
      :margin="10"
      :stagePadding="120"
      :autoplay="true"
      :autoplayTimeout="3500"
      :autoplayHoverPause="true"
      class="filmes-carousel"
      v-if="carousel && listaFilmes"
    >
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
    </carousel>
    <div class="filmes-container" v-else-if="!carousel && listaFilmes">
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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 10px;
  justify-items: center;
  align-content: start;
  justify-content: start;
  align-items: center;
}

.filme {
  max-width: 300px;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: 0.2s;
  border: 2px solid transparent;
}

.filme,
.filme a img {
  height: 330px;
}

.filme:hover {
  box-shadow: var(--shadow_hover);
  border-color: var(--azul);
}

.filme-titulo {
  position: absolute;
  padding: 0 10px 0 10px;
  padding-bottom: 0px;
  background: var(--azul);
  color: var(--branco);
  font-family: "Karla", sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  width: 100%;
  text-align: center;
  display: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@keyframes showTitle {
  from {
    opacity: 0;
    box-shadow: none;
  }
  to {
    opacity: 1;
    padding: 10px;
    box-shadow: var(--shadow_hover);
  }
}

.filme:hover .filme-titulo {
  display: block;
  animation: showTitle 0.2s forwards;
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
    height: 200px;
  }
}

@media screen and (max-width: 460px) {
  @keyframes showTitle {
    to {
      padding: 6px;
    }
  }

  .filme img {
    height: 170px;
  }
  .filme-data,
  .filme-titulo {
    font-size: 0.6rem;
    padding: 4px;
  }
}

.filmes-carousel {
  display: block;
  position: relative;
  margin: 0px 0 30px;
  overflow: hidden;
}

.filmes-carousel:before,
.filmes-carousel:after {
  content: "";
  position: absolute;
  top: 0;
  width: 10px;
  height: 100%;
  background: var(--background);
  box-shadow: 0px 0px 10px 10px var(--background);
  z-index: 10;
}

.filmes-carousel::before {
  left: 0;
}

.filmes-carousel::after {
  right: 0;
}
</style>