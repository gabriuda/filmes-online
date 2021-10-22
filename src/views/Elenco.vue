<template>
  <section v-if="pessoa">
    <h1>{{ pessoa.name }}</h1>
    <FilmesElenco :id="id" />
    <div class="elenco-container">
      <img
        v-if="pessoa.profile_path"
        :src="pessoa.profile_path | filmeImagem"
        :alt="pessoa.name"
      />
      <div class="biografia">
        <h2>Biografia</h2>
        <p v-if="pessoa.biography">{{ pessoa.biography }}</p>
        <p v-else>Sem dados.</p>
      </div>
    </div>
  </section>
</template>

<script>
import { tmdbApi, apiKey, language } from "@/services/index.js";
import FilmesElenco from "@/components/pagina_elenco/FilmesElenco.vue";

export default {
  name: "Elenco",
  props: ["id", "nome"],
  components: {
    FilmesElenco,
  },
  data() {
    return {
      pessoa: null,
    };
  },
  methods: {
    puxarPessoa() {
      tmdbApi
        .get(`/person/${this.id}?api_key=${apiKey}&${language}`)
        .then((response) => {
          this.pessoa = response.data;
          document.title = "Elenco - " + this.pessoa.name;
        });
    },
  },
  created() {
    this.puxarPessoa();
  },
};
</script>

<style scoped>
.elenco-container {
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid var(--branco);
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 30px;
}

p {
  margin-top: 30px;
}

@media screen and (max-width: 800px) {
  .elenco-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    margin: 0 auto;
  }

  .biografia h2 {
    text-align: center;
  }

  img {
    height: 300px;
  }
}

@media screen and (max-width: 460px) {
  .filme img {
    height: 160px;
  }
  .filme-data,
  .filme-titulo {
    font-size: 0.735rem;
    padding: 4px;
  }
}
</style>