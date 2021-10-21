<template>
  <section>
    <transition mode="out-in">
      <div v-if="filme">
        <FilmeIntro :filme="filme" />

        <section class="mais">
          <div>
            <h2 class="h2">Elenco</h2>
            <FilmesElenco :id="id" path="/movie" url="casts" />
          </div>
          <div>
            <h2>Produtoras</h2>
            <ul v-if="filme.production_companies.length">
              <li
                v-for="(emp, index) in filme.production_companies"
                :key="index"
              >
                <p v-if="emp.name">- {{ emp.name }}</p>
              </li>
            </ul>
          </div>
        </section>

        <FilmesRecomendados :id="id" />
      </div>
      <PageLoading v-else />
    </transition>
  </section>
</template>

<script>
import FilmesElenco from "@/components/filmes/pagina_filme/FilmesElenco.vue";
import FilmeIntro from "@/components/filmes/pagina_filme/FilmeIntro.vue";
import FilmesRecomendados from "@/components/filmes/pagina_filme/FilmesRecomendados.vue";
// import { tmdbApi, apiKey, language } from "@/services/index.js";

export default {
  name: "Filme",
  props: ["id"],
  components: {
    FilmeIntro,
    FilmesElenco,
    FilmesRecomendados,
  },
  computed: {
    url() {
      return this.$route.path;
    },
    filme() {
      return this.$store.state.filme;
    },
  },
  methods: {
    async puxarFilme() {
      this.$store.commit("UPDATE_FILME", null);
      try {
        await this.$store.dispatch("getFilme", this.id);
        document.title = "Assistir - " + this.filme.title;
      } catch (error) {
        // console.log(error);
      }
    },
  },
  watch: {
    url() {
      this.puxarFilme();
    },
  },
  created() {
    document.title = "Filme";
    this.puxarFilme();
  },
};
</script>

<style>
.mais {
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: baseline;
  margin: 60px auto;
  gap: 30px;
}

.h2 {
  margin-bottom: 20px;
}

@media screen and (max-width: 800px) {
  .mais {
    grid-template-columns: 1fr;
  }
}
</style>