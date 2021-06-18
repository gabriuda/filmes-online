<template>
  <section>
    <transition mode="out-in">
      <div v-if="filme">
        <section class="filme-container">
          <div class="filme-flex">
            <div class="filme-content">
              <img :src="filme.poster_path | filmeImagem" :alt="filme.title">
              <p v-if="filme.release_date" class="filme-data">{{ filme.release_date.slice(0, 4) }}</p>
            </div>
          </div>
          <div class="coluna-2">
            <h2>{{ filme.title }}</h2>
            <ul class="filme-info">
              <li class="generos">
                <span v-for="(genero, index) in filme.genres" :key="index">
                  <router-link :to="{ name: 'categoria', params: { id: genero.id } }">{{ genero.name }}</router-link>
                </span>
              </li>
              <li class="time">
                <p>{{ filme.runtime | convertTime }}</p>
              </li>
              <li class="date">
                <p>{{ filme.release_date.slice(0, 4) }}</p>
              </li>
            </ul>
            <p v-if="filme.overview">{{ filme.overview }}</p>
            <p v-else>Sem sinopse disponível</p>
            <a target="_blank" :href="`https://hdfog.club/video/player.php?id=${filme.imdb_id}&site=Online%20Filmes&color=1B262C`"><button class="btn btn-assistir">Assistir</button></a>
            <p class="aviso">Ao clicar em assistir, o player do filme será aberto em uma nova guia.</p>
          </div>
        </section>

        <section>
          <h2 class="t-feed">Talvez você goste também</h2>
          <FilmesComponente v-if="listaRecomendados" :listaFilmes="listaRecomendados" :carousel="true" />
          <p v-else>Nenhuma recomendação</p>
        </section>
      </div>
      <PageLoading v-else />
    </transition>
  </section>
</template>

<script>
  import FilmesComponente from "@/components/FilmesComponente.vue";
  import { tmdbApi, apiKey, language } from "@/services/index.js";
  
  export default {
    name: "Filme",
    props: ["id"],
    components: {
      FilmesComponente
    },
    data() {
      return {
        listaRecomendados: null
      }
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
        } catch (error) {
          // console.log(error);
        }
      },
      puxarRecomendacoes() {
        tmdbApi
        .get(`/movie/${this.id}/recommendations?api_key=${apiKey}&${language}`)
        .then((response) => {
          this.listaRecomendados = response.data;
        });
      }
    },
    watch: {
      url() {
        this.puxarFilme();
        this.puxarRecomendacoes();
      }
    },
    created() {
      document.title = "Filme";
      this.puxarFilme();
      this.puxarRecomendacoes();
    },
  }
</script>

<style scoped>
  .aviso {
    margin-top: 30px;
    border: 3px solid var(--azul);
    padding: 20px;
    padding-left: 80px;
    background: url('../assets/aviso.svg') no-repeat;
    background-size: 40px;
    background-position: 30px 60%;
  }

  .filme-content {
    position: relative;
  }
  
  .filme-content img, 
  .filme-content {
    height: 500px;
  }

  .filme-container {
    margin: 40px 0;
    display: grid;
    grid-template-columns: minmax(200px, 330px) 1fr;
    grid-gap: 60px;
  }

  h2 {
    margin-bottom: 30px;
  }

  .filme-info {
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    justify-content: space-around;
    border-top: 2px solid var(--branco); 
    border-bottom: 2px solid var(--branco); 
    padding: 20px 0;
  }

  .filme-info p {
    font-size: 0.975rem;
  }

  .generos ul {
    display: flex;
    gap: 10px;
  }

  .generos {
    padding-left: 30px;
    background: url('../assets/tag.svg') no-repeat left center;
  }

  .generos span:first-child:before {
    content: "";
  }

  .generos span::before {
    content: " / ";
  }

  .generos span a {
    color: var(--branco);
  }

  .generos span a:hover {
    text-decoration: underline;
  }

  .time {
    padding-left: 30px;
    background: url('../assets/clock.svg') no-repeat left center;
  }

  .date {
    padding-left: 30px;
    background: url('../assets/calendar.svg') no-repeat left center;
  }
  
  .btn-assistir {
    border-color: var(--vermelho);
    font-family: 'Oswald', sans-serif;
    color: var(--vermelho);
    padding: 10px 60px;
    font-size: 1.5rem;
    margin-top: 30px;
  }

  .btn-assistir:hover {
    color: var(--branco);
    border-color: var(--branco);
    background: var(--azul);
    box-shadow: var(--shadow_hover);
  }

  .filme-flex {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .filme-iframe {
    margin: 60px 0;
    position: relative;
    padding-bottom: 56.25%;
  }

  .filme-iframe iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px  solid var(--vermelho);
  }

  @media screen and (max-width: 1100px) {
    .filme-info li p, span{
      font-size: .9rem;
    }
    .filme-info li {
      padding-left: 20px;
      background-size: 15px;
    }
  }

  @media screen and (max-width: 800px) {
    .filme-container {
      grid-template-columns: 1fr;
    }
    .coluna-2 {
      grid-row: 1;
    }
    
  }
  @media screen and (max-width: 580px) {
    .filme-info li {
      padding-left: 20px;
      background-size: 15px;
    }
    .filme-info {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>