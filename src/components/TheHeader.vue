<template>
  <header>
    <div class="header-container">
      <router-link to="/?page=1" class="logo">
        <img alt="OnlineFilmes" src="../assets/logo.svg">
      </router-link>
      <nav class="menu">
        <button @click.prevent="abrirMenu" class="open-menu" :class="{ active: ativarMenu }"><span></span><span></span><span></span></button>
        <ul :class="{ active: ativarMenu }">
          <li class="search-menu">
            <form>
              <div class="search">
                <input type="text" placeholder="Buscar filme..." v-model.lazy="termo" @change="buscarFilmes">
                <input type="submit" value="Buscar" @click.prevent="buscarFilmes">
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
  export default {
    name: "TheHeader",
    data() {
      return {
        ativarMenu: false,
        termo: "",
      }
    },
    methods: {
      abrirMenu() {
        this.ativarMenu = !this.ativarMenu;
      },
      buscarFilmes() {
        this.$router.push({ name: 'Home', query: { query: this.termo } })
        .catch(() => {});
        this.abrirMenu();
      }
    },
    watch: {
      termo() {
        this.buscarFilmes();
      },
    },
    created() {
       window.addEventListener('click', (e) => {
        if (!this.$el.contains(e.target)){
          this.ativarMenu = false;
        }
      });
    }
  }
</script>

<style scoped>
  header {
    padding: 20px;
  }

  .header-container {
    margin: 0 auto;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .menu ul {
    display: flex;
    align-items: center;
    gap: 60px;
  }

  .menu ul li a {
    display: block;
    padding: 10px 0px;
    font-family: 'Karla', sans-serif;
    color: var(--branco);
    font-size: 1.5rem;
  }
  
  .menu ul li a:hover {
    color: var(--azul);
  }

  .menu ul li a.router-link-exact-active {
    color: var(--azul);
  }

  .search-menu {
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
    .menu ul {
      display: block;
    }
    .menu ul li {
      padding: 0 20px;
    }
    .menu ul li + li {
      margin-top: 20px;
    }
    .open-menu {
      display: block;
      z-index: 1999;
      position: fixed;
      right: 32px;
      top: 32px;
    }
    .menu ul {
      position: fixed;
      top: 0;
      transition: .4s;
      right: 0px;
      transform: translate3d(500px, 0px, 0px);
      height: 100vh;
      padding-top: 20px;
      box-shadow: -20px 0px 20px 0 rgba(0,0,0,.35);
      background: var(--background);
      z-index: 999;
    }
    .menu ul li:first-child {
      margin-top: 60px;
    }
    .menu ul.active {
      transform: translate3d(0px, 0px, 0px);
      z-index: 999;
    }
  }
</style>