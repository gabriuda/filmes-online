<template>
  <section v-if="filmesDaPessoa && seriesDaPessoa">
    <ul class="escolher">
      <li>
        <input
          type="radio"
          id="filmes"
          name="conteudo"
          :value="1"
          v-model="conteudo"
          checked
        />
        <label for="filmes">Filmes ({{ filmesDaPessoa.total_results }})</label>
      </li>
      <li>
        <input
          type="radio"
          id="series"
          name="conteudo"
          :value="2"
          v-model="conteudo"
          checked
        />
        <label for="series">Séries ({{ seriesDaPessoa.cast.length }})</label>
      </li>
    </ul>
    <transition mode="out-in">
      <FilmesComponente
        v-if="conteudo === 1 && filmesDaPessoa"
        :listaFilmes="filmesDaPessoa"
        :carousel="false"
        nomeLink="movie"
      />
      <div v-if="conteudo === 2 && seriesDaPessoa">
        <div class="filmes-container">
          <div
            class="filme"
            v-for="(serie, index) in seriesDaPessoa.cast"
            :key="index"
            :class="{ ativo: serie.poster_path }"
          >
            <router-link :to="{ name: 'tv', params: { id: serie.id } }">
              <div class="filme-titulo">
                <b>{{ serie.name }}</b>
              </div>
              <img
                v-if="serie.poster_path"
                :src="serie.poster_path | filmeImagem"
                :alt="serie.title"
              />
              <p v-if="serie.release_date" class="filme-data">
                {{ serie.release_date.slice(0, 4) }}
              </p>
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { tmdbApi, apiKey, language } from "@/services/index.js";
import FilmesComponente from "@/components/filmes/FilmesComponente.vue";

export default {
  name: "FilmesElenco",
  props: ["id"],
  components: {
    FilmesComponente,
  },
  data() {
    return {
      filmesDaPessoa: null,
      seriesDaPessoa: null,
      conteudo: 1,
    };
  },
  methods: {
    puxarFilmesDaPessoa() {
      tmdbApi
        .get(
          `/discover/movie?with_people=${this.id}&api_key=${apiKey}&${language}`
        )
        .then((response) => {
          this.filmesDaPessoa = response.data;
        });
    },
    puxarSeriesDaPessoa() {
      tmdbApi
        .get(`/person/${this.id}/tv_credits?api_key=${apiKey}&${language}`)
        .then((response) => {
          this.seriesDaPessoa = response.data;
        });
    },
  },
  created() {
    this.puxarFilmesDaPessoa();
    this.puxarSeriesDaPessoa();
  },
};
</script>

<style scoped>
.opcoes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0px 30px;
  margin: 30px 0;
}
</style>