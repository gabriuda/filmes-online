<template>
  <transition mode="out-in">
    <section v-if="elencoBuscado">
      <div class="elenco-container">
        <div
          class="elenco-item"
          v-for="(item, key) in elencoBuscado.results"
          :key="key"
        >
          <router-link
            :to="{ name: 'elenco', params: { id: item.id, nome: item.name } }"
          >
            <div>
              <img
                v-if="item.profile_path"
                :src="item.profile_path | filmeImagem"
                :alt="item.name"
              />
              <img v-else src="@/assets/people.png" class="img-people" />
              <p>{{ item.name }}</p>
            </div>
          </router-link>
        </div>
      </div>
      <div class="paginacao">
        <FilmesPaginacao :totalFilmes="elencoBuscado.total_pages" />
      </div>
    </section>
  </transition>
</template>

<script>
import FilmesPaginacao from "@/components/FilmesPaginacao.vue";

export default {
  name: "ElencoFeed",
  components: {
    FilmesPaginacao,
  },
  computed: {
    url() {
      let queryString = "";
      for (let key in this.$route.query) {
        queryString += `&${key}=${this.$route.query[key]}`;
      }
      return queryString;
    },
    query() {
      return this.$route.query.query;
    },
    elencoBuscado() {
      return this.$store.state.elencoBuscado;
    },
  },
  watch: {
    url() {
      this.$store.commit("UPDATE_ELENCO_BUSCADO", null);
      this.$store.dispatch("getElencoBuscado", this.url);
    },
  },
  created() {
    this.$store.dispatch("getElencoBuscado", this.url);
  },
};
</script>


<style scoped>
.elenco-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 10px;
}

.elenco-item {
  position: relative;
  border: 2px solid transparent;
  transition: 0.2s;
}

.elenco-item:hover {
  border-color: var(--azul);
  box-shadow: var(--shadow_hover);
}

p {
  font-size: 1rem;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: var(--azul);
  padding: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.img-people {
  object-fit: cover;
  height: 160px;
}

@media screen and (max-width: 700px) {
  .elenco-container {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-gap: 6px;
  }
  p {
    font-size: 0.7rem;
  }
}
</style>