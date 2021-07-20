<template>
  <header>
    <div class="header-container">
      <router-link to="/?page=1" class="logo">
        <img alt="OnlineFilmes" src="../assets/logo.svg" />
      </router-link>
      <nav class="menu">
        <button
          @click.prevent="abrirMenu"
          class="open-menu"
          :class="{ active: ativarMenu }"
        >
          <span></span><span></span><span></span>
        </button>
        <button class="btn-pesquisar" @click="ativarPesquisa = true">
          <img src="@/assets/lupa.svg" alt="" />
        </button>
        <transition mode="out-in">
          <form class="pesquisa-ativa" v-if="ativarPesquisa">
            <FilmesBuscar />
          </form>
        </transition>
        <ul :class="{ active: ativarMenu }">
          <li class="search-menu">
            <form>
              <div class="search">
                <input
                  type="text"
                  placeholder="Buscar filme..."
                  v-model.lazy="termo"
                  @change="buscarFilmes"
                />
                <input
                  type="submit"
                  value="Buscar"
                  @click.prevent="buscarFilmes"
                />
              </div>
            </form>
          </li>
          <li><router-link to="/?page=1">Início</router-link></li>
          <li><router-link to="/categorias">Categorias</router-link></li>
          <li><router-link to="/populares/?page=1">Populares</router-link></li>
          <li><router-link to="/copyright">Copyright</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import FilmesBuscar from "./FilmesBuscar.vue";

export default {
  name: "TheHeader",
  components: {
    FilmesBuscar,
  },
  data() {
    return {
      ativarPesquisa: false,
      ativarMenu: false,
      termo: "",
    };
  },
  computed: {
    query() {
      return this.$route.query;
    },
    url() {
      return this.$route.path;
    },
  },
  methods: {
    headerScroll() {
      window.addEventListener("scroll", () => {
        const activeClass = "active";
        const header = document.querySelector("header");
        if (window.pageYOffset !== 0) header.classList.add(activeClass);
        else header.classList.remove(activeClass);
      });
    },
    abrirMenu() {
      this.ativarMenu = !this.ativarMenu;
    },
    fecharMenu() {
      window.addEventListener("click", (e) => {
        if (!this.$el.contains(e.target)) {
          this.ativarPesquisa = false;
          this.ativarMenu = false;
        }
      });
    },
    buscarFilmes() {
      this.$router
        .push({ name: "Home", query: { query: this.termo } })
        .catch(() => {});
      this.abrirMenu();
    },
  },
  watch: {
    termo() {
      this.buscarFilmes();
    },
    query() {
      this.ativarPesquisa = false;
    },
    url() {
      this.ativarMenu = false;
    },
  },
  created() {
    this.headerScroll(), this.fecharMenu();
  },
};
</script>

<style scoped>
header {
  padding: 20px;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 9999;
  transition: 0.2s;
}

.pesquisa-ativa {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  padding: 20px;
  background: var(--background);
  box-shadow: var(--shadow_hover);
}

header.active {
  padding: 10px;
  background: var(--background);
  box-shadow: 0px 0px 80px 0px rgba(30, 60, 90, 0.5);
}

header.active .menu ul li a {
  font-size: 1.2rem;
}

.header-container a,
.open-menu {
  transition: 0.2s;
}

header.active .open-menu {
  top: 19px;
}

.header-container {
  margin: 0 auto;
  max-width: 1400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu ul {
  display: flex;
  align-items: center;
  gap: 60px;
}

.menu ul li {
  padding: 10px 0px;
}

.menu ul li a {
  display: block;
  padding: 10px;
  font-family: "Karla", sans-serif;
  color: var(--branco);
  font-size: 1.5rem;
  text-align: center;
}

.menu ul li a:hover {
  color: var(--azul);
}

.menu ul li a.router-link-exact-active {
  color: var(--azul);
}

.menu ul li.search-menu {
  display: none;
}

.btn-pesquisar {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 10px;
  display: none;
}

@media screen and (max-width: 920px) {
  .search-menu {
    display: block;
  }
  .menu ul li a {
    font-size: 1.2rem;
  }
  .logo {
    max-width: 100px;
  }
}

.open-menu {
  display: none;
  width: 40px;
  height: 40px;
  background: var(--background);
  border: none;
  position: relative;
  cursor: pointer;
  box-shadow: var(--shadow);
}

.open-menu span {
  right: 10px;
  left: 10px;
  position: absolute;
  display: block;
  width: 22px;
  height: 2px;
  background: var(--branco);
  transition: transform 0.4s;
}

.open-menu span:nth-child(1) {
  top: 13px;
}

.open-menu span:nth-child(2) {
  top: 20px;
}

.open-menu span:nth-child(3) {
  top: 27px;
}

.open-menu.active span:nth-child(1) {
  top: 20px;
  transform: rotate(45deg);
}

.open-menu.active span:nth-child(2) {
  transform: translate3d(-10px, 0, 0);
  visibility: hidden;
}

.open-menu.active span:nth-child(3) {
  top: 20px;
  transform: rotate(-45deg);
}

@media (max-width: 920px) {
  .btn-pesquisar {
    display: initial;
  }
  .menu {
    padding: 0px;
    display: flex;
    align-items: center;
    gap: 16px;
    flex-direction: row-reverse;
  }
  .open-menu {
    display: block;
    z-index: 1999;
    position: fixed;
    right: 20px;
    top: 29px;
  }
  .btn-pesquisar {
    margin-right: 60px;
  }
  .menu ul {
    position: fixed;
    top: 0;
    transition: 0.2s;
    right: 0px;
    transform: translate3d(500px, 0px, 0px);
    height: 100vh;
    box-shadow: -20px 0px 20px 0 rgba(0, 0, 0, 0.35);
    background: var(--background);
    z-index: 999;
    width: 260px;
    padding-top: 80px;
    display: block;
  }
  .menu ul li {
    transition: 0.2s;
    text-align: start;
    padding: 0px;
  }
  .menu ul li a {
    text-align: start;
    padding: 20px;
  }
  .menu ul li a:hover {
    background: #273740;
  }
  .menu ul li a:hover a {
    color: var(--branco);
  }
  .menu ul.active {
    transform: translate3d(0px, 0px, 0px);
  }
}
</style>