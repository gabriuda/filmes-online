<template>
  <transition mode="out-in">
    <section v-if="serie">
      <SerieIntro :serie="serie" />
      <section class="mais">
        <div>
          <h2 class="h2">Elenco</h2>
          <FilmesElenco :id="id" path="/tv" url="credits" />
        </div>
        <div>
          <h2>Produtoras</h2>
          <ul v-if="serie.production_companies.length">
            <li v-for="(emp, index) in serie.production_companies" :key="index">
              <p v-if="emp.name">- {{ emp.name }}</p>
            </li>
          </ul>
        </div>
      </section>

      <FilmesRecomendados :id="id" />
    </section>
    <div v-else>
      <PageLoading />
    </div>
  </transition>
</template>

<script>
import { tmdbApi, apiKey, language } from "@/services/index.js";
import SerieIntro from "@/components/SerieIntro.vue";
import FilmesElenco from "@/components/filmes/pagina_filme/FilmesElenco.vue";
import FilmesRecomendados from "@/components/filmes/pagina_filme/FilmesRecomendados.vue";

export default {
  name: "Serie",
  props: ["id"],
  data() {
    return {
      serie: null,
    };
  },
  components: {
    SerieIntro,
    FilmesElenco,
    FilmesRecomendados,
  },
  computed: {
    url() {
      return this.$route.path;
    },
  },
  methods: {
    getSerie() {
      this.serie = null;
      tmdbApi
        .get(
          `/tv/${this.id}?api_key=${apiKey}&${language}&append_to_response=external_ids`
        )
        .then((response) => {
          this.serie = response.data;
        });
    },
  },
  watch: {
    url() {
      this.getSerie();
    },
  },
  created() {
    this.getSerie();
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>