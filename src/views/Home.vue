<template>
  <div>
    <div class="logo">
      <img src="@/assets/logo-completa.svg" alt="OnlineFilmes" />
    </div>
    <FilmesBuscar />
    <div class="filmes-home">
      <div class="opcoes opc-home">
        <ul class="escolher">
          <li>
            <input
              type="radio"
              id="fpopulares"
              name="filmes"
              :value="1"
              v-model="filmeContent"
              checked
            />
            <label for="fpopulares">Populares</label>
          </li>
          <li>
            <input
              type="radio"
              id="fcartaz"
              name="filmes"
              :value="2"
              v-model="filmeContent"
            />
            <label for="fcartaz">Em Cartaz </label>
          </li>
          <li>
            <input
              type="radio"
              id="faclamados"
              name="filmes"
              :value="3"
              v-model="filmeContent"
            />
            <label for="faclamados">Aclamados </label>
          </li>
        </ul>
      </div>
      <transition mode="out-in" name="troca">
        <FilmesPopulares v-if="filmeContent === 1" />
        <FilmesCartaz v-if="filmeContent === 2" />
        <FilmesAclamados v-if="filmeContent === 3" />
      </transition>
      <div class="opcoes opc-home">
        <ul class="escolher">
          <li>
            <input
              type="radio"
              id="spopulares"
              name="series"
              :value="1"
              v-model="serieContent"
              checked
            />
            <label for="spopulares">Populares</label>
          </li>
          <li>
            <input
              type="radio"
              id="shoje"
              name="series"
              :value="2"
              v-model="serieContent"
            />
            <label for="shoje">Hoje</label>
          </li>
          <li>
            <input
              type="radio"
              id="saclamadas"
              name="series"
              :value="3"
              v-model="serieContent"
            />
            <label for="saclamadas">Aclamadas</label>
          </li>
        </ul>
      </div>
      <transition mode="out-in" name="troca">
        <SeriesPopulares v-if="serieContent === 1" />
        <SeriesHoje v-if="serieContent === 2" />
        <SeriesAclamadas v-if="serieContent === 3" />
      </transition>

      <div class="opcoes opc-home">
        <ul class="escolher">
          <li>
            <input
              type="radio"
              id="apopulares"
              name="animacoes"
              :value="1"
              v-model="animacaoContent"
              checked
            />
            <label for="apopulares">Populares</label>
          </li>
          <li>
            <input
              type="radio"
              id="anovas"
              name="animacoes"
              :value="2"
              v-model="animacaoContent"
            />
            <label for="anovas">Novas</label>
          </li>
          <li>
            <input
              type="radio"
              id="aaclamadas"
              name="animacoes"
              :value="3"
              v-model="animacaoContent"
            />
            <label for="aaclamadas">Aclamadas</label>
          </li>
        </ul>
      </div>

      <transition mode="out-in">
        <SeriesAnimacoesPopulares v-if="animacaoContent === 1" />
        <SeriesAnimacoesNovas v-if="animacaoContent === 2" />
        <SeriesAnimacoesAclamadas v-if="animacaoContent === 3" />
      </transition>
    </div>
  </div>
</template>

<script>
import FilmesBuscar from "@/components/filmes/FilmesBuscar.vue";
import FilmesPopulares from "@/components/pagina_home/FilmesPopulares.vue";
import FilmesCartaz from "@/components/pagina_home/FilmesCartaz.vue";
import FilmesAclamados from "@/components/pagina_home/FilmesAclamados.vue";
import SeriesPopulares from "@/components/pagina_home/SeriesPopulares.vue";
import SeriesHoje from "@/components/pagina_home/SeriesHoje.vue";
import SeriesAclamadas from "@/components/pagina_home/SeriesAclamadas.vue";
import SeriesAnimacoesPopulares from "@/components/pagina_home/SeriesAnimacoesPopulares.vue";
import SeriesAnimacoesAclamadas from "@/components/pagina_home/SeriesAnimacoesAclamadas.vue";
import SeriesAnimacoesNovas from "@/components/pagina_home/SeriesAnimacoesNovas.vue";

export default {
  name: "Home",
  data() {
    return {
      filmeContent: 1,
      serieContent: 1,
      animacaoContent: 1,
    };
  },
  components: {
    FilmesBuscar,
    FilmesPopulares,
    FilmesCartaz,
    FilmesAclamados,
    SeriesPopulares,
    SeriesHoje,
    SeriesAclamadas,
    SeriesAnimacoesPopulares,
    SeriesAnimacoesAclamadas,
    SeriesAnimacoesNovas,
  },
  computed: {
    query() {
      return this.$route.query.query;
    },
  },
  created() {
    document.title = "OnlineFilmes";
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 30px;
}

div {
  display: flex;
  flex-direction: column;
}

.logo {
  align-self: center;
  margin: 30px auto;
}

@media screen and (max-width: 600px) {
  .logo {
    max-width: 300px;
  }
}

.titulo-flex {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  border-bottom: 1px solid var(--branco);
  margin-bottom: 20px;
}

.t-recentes {
  margin-bottom: 20px;
}

.filmes-home {
  margin-top: 20px;
}

.opc-home {
  margin: 0 auto;
}

.opc-home ul {
  flex-wrap: nowrap;
}

@media screen and (max-width: 500px) {
  .titulo-flex {
    grid-template-columns: auto;
  }
  .opc-home {
    margin: 0;
    position: relative;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: ms-autohiding-scrollbar;
  }
}
</style>
