<template>
  <section>
    <transition mode="out-in">
      <div v-if="filme">
        <div class="img-background">
          <img v-if="filme.backdrop_path" :src="filme.backdrop_path | filmeImagem" :alt="filme.title">
          <div class="background"></div>
        </div>
        <section class="filme-container">
          <div class="filme-flex">
            <div class="filme-content">
              <img :src="filme.poster_path | filmeImagem" :alt="filme.title">
              <p v-if="filme.release_date" class="filme-data">{{ filme.release_date.slice(0, 4) }}</p>
            </div>
            <div class="tmdb-votos">
              <p>TMDB: <span class="nota">{{ filme.vote_average }}</span></p>
              <p class="quantidade-nota">Votações: <span class="nota">{{ filme.vote_count }}</span></p>
            </div>
          </div>
          <div class="coluna-2">
            <h2>{{ filme.title }}</h2>
            <h3 v-if="filme.tagline" class="tagline">{{ filme.tagline }}</h3>
            <ul class="filme-info">
              <li class="generos">
                <span v-for="(genero, index) in filme.genres" :key="index">
                  <router-link :to="{ name: 'categoria', query: { page: 1 }, params: { id: genero.id } }">{{ genero.name }}</router-link>
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
            <div class="btns">
              <button @click="assistir = true" class="btn btn-assistir">Assistir</button>
              <transition mode="out-in">
                <div class="servidores" v-if="assistir">
                  <a target="_blank" :href="`https://hdfog.club/video/player.php?id=${filme.imdb_id}&site=Online%20Filmes&color=1B262C`" class="btn">Servidor 1</a>
                  <a target="_blank" :href="`https://api.obaflix.com/embed/${filme.imdb_id}`" class="btn">Servidor 2</a>
                </div>
              </transition>
            </div>
            <p class="aviso">O player do filme será aberto em uma nova guia.</p>
          </div>
        </section>

        <section class="mais">
          <div>
            <h2>Elenco</h2>
            <FilmesElenco :id="id" />
            <!-- <p v-else>Sem dados.</p> -->
          </div>
          <div>
            <h2>Produtoras</h2>
            <ul v-if="filme.production_companies.length">
                <li v-for="emp, index in filme.production_companies" :key="index">
                  <p v-if="emp.name">- {{ emp.name }}</p>
                </li>
              </ul>
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
  import FilmesElenco from "@/components/FilmesElenco.vue";
  import { tmdbApi, apiKey, language } from "@/services/index.js";
  
  export default {
    name: "Filme",
    props: ["id"],
    components: {
      FilmesComponente,
      FilmesElenco
    },
    data() {
      return {
        listaRecomendados: null,
        assistir: false,
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
  .img-background img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    object-fit: cover;
    z-index: -2;
    filter: brightness(.4);
  }

  .img-background .background {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40vh;
    background: var(--background);
    box-shadow: 0px -50px 100px 60px var(--background);
    z-index: -1;
  }

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
    grid-gap: 30px;
  }

  h2 {
    margin-bottom: 20px;
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
    background: transparent;
    padding: 10px 60px;
    font-size: 1.5rem;
  }

  .btn-assistir:hover {
    color: var(--branco);
    border-color: var(--branco);
    background: var(--azul);
    box-shadow: var(--shadow_hover);
  }

  .filme-flex {
    display: flex;
    flex-direction: column;
  }

  .btns {
    margin-top: 30px;
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 30px;
  }
  
  .servidores {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;
  }

  .mais {
    display: grid;
    grid-template-columns: 2fr 1fr;
    margin: 60px auto;
  }

  .tmdb-votos {
    margin-top: 30px;
    display: flex;
    align-items: center;
    gap: 20px;
    border: 2px solid var(--branco);
    padding: 20px 30px;
    background-size: 40px;
    background-position: 95% 50%;
  }

  .tmdb-votos p {
    color: #E4CF13;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .nota {
    font-size: 1.8rem;
    font-family: 'Oswald', sans-serif;
  }
  
  .tagline {
    text-transform: uppercase;
    font-size: 1.2rem;
    letter-spacing: 2px;
    color: var(--vermelho);
  }

  @media screen and (max-width: 1100px) {
    .filme-info li p, span{
      font-size: .9rem;
    }
    .filme-info li {
      padding-left: 20px;
      background-size: 15px;
    }
    .btns{
      grid-template-columns: 1fr;
    }
  }

  @media screen and (max-width: 800px) {
    .filme-container {
      grid-template-columns: 1fr;
    }
    .filme-content img, 
    .filme-content {
      height: 300px;
    }
    .img-background .background {
      height: 0px;
      box-shadow: 0px 0px 100px 130px var(--background);
    }
    .img-background img {
      height: 100vh;
    }
    .mais {
      grid-template-columns: 1fr;
    }
    .produtoras {
      grid-row: 2;
    }
    .tagline {
      font-size: 1.4rem;
    }
    .tagline span {
      font-size: 3rem;
    }
  }
  @media screen and (max-width: 580px) {
    .filme-info li {
      padding-left: 20px;
      background-size: 15px;
    }
    .filme-info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      align-items: center;
      justify-items: center;
    }
    .generos {
      grid-column: 1 / -1;
    }
    .tagline {
      font-size: 0.9rem;
      line-height: 1.4;
    }
  }
</style>