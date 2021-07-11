<template>
  <div>
    <ul v-if="elenco">
      <li v-for="(item, i) in elenco.cast" :key="i">
        <router-link
          :to="{ name: 'elenco', params: { id: item.id, nome: item.name } }"
        >
          <div>
            <transition mode="out-in">
              <img
                v-if="item.profile_path"
                :src="item.profile_path | filmeImagem"
                :alt="item.name"
              />
              <img v-else src="@/assets/people.png" class="img-people" />
            </transition>
            <p>{{ item.character }}</p>
            <b>{{ item.name }}</b>
          </div>
        </router-link>
      </li>
    </ul>
    <p v-else>Sem dados</p>
  </div>
</template>

<script>
import { tmdbApi, apiKey, language } from "@/services/index.js";

export default {
  name: "FilmesElenco",
  props: ["id"],
  data() {
    return {
      elenco: null,
    };
  },
  methods: {
    puxarElenco() {
      tmdbApi
        .get(`/movie/${this.id}/casts?api_key=${apiKey}&${language}`)
        .then((response) => (this.elenco = response.data));
    },
  },
  created() {
    this.puxarElenco();
  },
};
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  gap: 30px 20px;
  align-items: center;
  height: 430px;
  overflow-y: auto;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 15px;
}

::-webkit-scrollbar-track {
  border: 2px solid var(--azul);
}

::-webkit-scrollbar-thumb {
  background: var(--azul);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--azul);
}

ul li {
  max-width: 100px;
  overflow-x: hidden;
}

p {
  font-size: 1rem;
}

b {
  font-family: "Karla", sans-serif;
  font-size: 0.775rem;
  color: var(--azul);
}

p,
b {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.img-people {
  object-fit: cover;
  height: 150px;
}
</style>