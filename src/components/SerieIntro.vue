<template>
  <section v-if="serie">
    <div class="img-background">
      <img
        v-if="serie.backdrop_path"
        :src="serie.backdrop_path | filmeImagem"
        :alt="serie.name"
      />
      <div class="background"></div>
    </div>
    <section class="filme-container">
      <div class="filme-flex">
        <div class="filme-content">
          <img :src="serie.poster_path | filmeImagem" :alt="serie.name" />
          <p v-if="serie.first_air_date" class="filme-data">
            {{ serie.first_air_date.slice(0, 4) }}
          </p>
        </div>
        <div class="tmdb-votos">
          <p>
            TMDB: <span class="nota">{{ serie.vote_average }}</span>
          </p>
          <p class="quantidade-nota">
            Votações: <span class="nota">{{ serie.vote_count }}</span>
          </p>
        </div>
      </div>
      <div class="coluna-2">
        <h2>{{ serie.name }}</h2>
        <h3 v-if="serie.tagline" class="tagline">{{ serie.tagline }}</h3>
        <ul class="filme-info">
          <li class="generos">
            <span v-for="(genero, index) in serie.genres" :key="index">
              <router-link
                :to="{
                  name: 'categoria',
                  query: { page: 1 },
                  params: { id: genero.id },
                }"
                >{{ genero.name }}</router-link
              >
            </span>
          </li>
          <li class="time">
            <p>{{ serie.episode_run_time | convertTime }}</p>
          </li>
          <li class="date">
            <p>{{ serie.first_air_date.slice(0, 4) }}</p>
          </li>
        </ul>
        <p v-if="serie.overview">{{ serie.overview }}</p>
        <p v-else>Sem sinopse disponível</p>
        <div class="btns" v-if="serie.vote_count > 1">
          <a
            class="btn btn-assistir"
            target="_blank"
            :href="`https://embed.warezcdn.com/serie/${serie.external_ids.imdb_id}/`"
          >
            Assistir
          </a>
        </div>
        <p v-else class="tagline em-breve">Em breve...</p>
        <p class="aviso">
          O player da série será aberto em uma nova guia com os episódios.
        </p>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: "FilmeIntro",
  props: ["serie"],
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>