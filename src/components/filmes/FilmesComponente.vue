<template>
  <transition mode="out-in" v-if="carousel && listaFilmes">
    <div v-if="carousel && listaFilmes">
      <carousel
        :responsive="{
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
      >
        <div
          class="filme"
          v-for="(filme, index) in listaFilmes.results"
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
          </router-link>
        </div>
      </carousel>
      <div class="filmes-carousel-responsivo">
        <ul>
          <li
            class="filme"
            v-for="(filme, index) in listaFilmes.results"
            :key="index"
            :class="{ ativo: filme.poster_path }"
          >
            <router-link :to="{ name: nomeLink, params: { id: filme.id } }">
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
          </li>
        </ul>
      </div>
    </div>
    <div class="filmes-container" v-else-if="!carousel && listaFilmes">
      <div
        class="filme"
        v-for="(filme, index) in listaFilmes.results"
        :key="index"
        :class="{ ativo: filme.poster_path }"
      >
        <router-link :to="{ name: nomeLink, params: { id: filme.id } }">
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
  computed: {
    path() {
      return this.$router.path;
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

.filmes-carousel-responsivo ul {
  display: none;
}

@media screen and (max-width: 800px) {
  .filmes-carousel,
  .filmes-carousel:before,
  .filmes-carousel:after,
  .filmes-carousel * {
    display: none;
  }
  .filmes-carousel-responsivo ul {
    display: flex;
    gap: 10px;
  }
  .filmes-carousel-responsivo ul li {
    flex: 1 0 180px;
  }
  .filmes-carousel-responsivo ul li a img,
  .filmes-carousel-responsivo ul li {
    height: 270px;
  }
  .filmes-carousel-responsivo {
    position: relative;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: ms-autohiding-scrollbar;
  }
}

@media screen and (max-width: 700px) {
  .filmes-container {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-gap: 6px;
  }
  .filme-titulo {
    padding: 5px;
    font-size: 0.735rem;
  }
  .filme-data {
    font-size: 0.9rem;
    bottom: 3%;
  }

  .filme,
  .filme a img {
    height: 180px;
  }
  @keyframes showTitle {
    to {
      padding: 6px;
    }
  }
  .filme-data,
  .filme-titulo {
    font-size: 0.6rem;
    padding: 4px;
  }
}

@media screen and (max-width: 460px) {
  .filmes-carousel-responsivo ul li {
    flex: 1 0 160px;
  }
  .filmes-carousel-responsivo ul li a img,
  .filmes-carousel-responsivo ul li {
    height: 240px;
  }
}

.filmes-carousel {
  display: block;
  position: relative;
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

.filmes-carousel:before {
  left: 0;
}

.filmes-carousel:after {
  right: 0;
}
</style>