<template>
  <div id="app">
    <TheHeader />
    <main>
      <transition mode="out-in">
        <router-view class="content"></router-view>
      </transition>
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style>
/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}

/* Colors */
:root {
  --background: #1b262c;
  --header_active: #182329;
  --header_active_shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.5);
  --branco: #eeebdd;
  --shadow: 0px 4px 8px 0px rgba(30, 60, 90, 0.15);
  --shadow_hover: 0px 16px 26px 0px rgba(30, 60, 90, 0.75);
  --azul: #0f4c75;
  --vermelho: #ce1212;
}

/* Gerais */
body {
  background-color: var(--background);
}

/* Texto */
h1,
h2,
h3 {
  font-family: "Oswald", sans-serif;
  color: var(--branco);
  line-height: 1;
}

h1 {
  font-size: 4.735rem;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--branco);
  line-height: 1;
}

h2 {
  font-size: 2.6rem;
}

h3 {
  font-size: 2rem;
}

.t-feed::after {
  content: "";
  margin-top: 18px;
  display: block;
  height: 1px;
  background: var(--branco);
  width: 100%;
}

p,
span {
  font-family: "Karla", sans-serif;
  color: var(--branco);
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.4;
}

span {
  font-size: 0.975rem;
}

/* Layout */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  padding-top: 100px;
  flex: 1;
}

.content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

/* Busca */
.search {
  display: grid;
  grid-template-columns: 1fr 80px;
  max-width: 960px;
  margin: 0 auto;
}

.search input[type="text"] {
  outline: none;
  padding: 10px 20px;
  border: 2px solid var(--branco);
  font-family: "Karla", sans-serif;
  color: var(--branco);
  font-size: 1rem;
  transition: 0.2s;
  background: transparent;
}

.search input[type="text"]:focus,
.search input[type="text"]:focus ~ input[type="submit"] {
  box-shadow: var(--shadow_hover);
}

.search input[type="submit"] {
  padding: 10px 35px;
  background: transparent url("./assets/lupa.svg") no-repeat center center;
  text-indent: -150px;
  border: 2px solid var(--branco);
  border-left: none;
  transition: 0.2s;
  cursor: pointer;
}

/* Páginas */
.paginas {
  font-size: 0.9rem;
  font-family: "Karla", sans-serif;
  color: var(--branco);
  margin-bottom: 20px;
  display: flex;
  gap: 4px;
}

.paginas li,
.paginas a {
  color: var(--branco);
  padding: 10px 0px;
}

.paginas a:hover,
.paginas a.router-link-exact-active {
  text-decoration: underline;
  color: var(--azul);
}

.paginas li:first-child:before {
  content: "";
}

.paginas li:first-child:after {
  content: "";
}

.paginas li::before {
  content: " > ";
}

/* Escolher */
.escolher {
  display: flex;
  flex-wrap: wrap;
  max-width: 500px;
  margin: 20px 0;
}

.escolher li input {
  display: none;
}

.escolher li label {
  font-family: "Karla", sans-serif;
  font-size: 0.9rem;
  display: block;
  width: 130px;
  height: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--azul);
  color: var(--branco);
  transition: 0.2s;
  padding: 4px;
  opacity: 0.75;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.escolher li input:checked ~ label,
label:hover {
  opacity: 1;
  border-color: var(--branco);
}

/* Botão */
.btn {
  font-family: "Karla", sans-serif;
  color: var(--branco);
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  border: 2px solid var(--branco);
  padding: 10px 40px;
  background: var(--background);
  transition: 0.2s;
  cursor: pointer;
  outline: none;
  box-shadow: var(--shadow);
}

.btn:hover {
  color: var(--background);
  background: var(--branco);
}

.btn.select {
  -webkit-appearance: none;
  -moz-appearance: none;
  background: var(--background) url("./assets/arrow-down.svg") no-repeat;
  background-position: 90% 50%;
  background-size: 15px;
  padding-left: 20px;
}

.btn.select:hover {
  color: var(--branco);
}

/* Animações */
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter {
  transform: translate3d(0, 20px, 0);
}
.v-leave-to {
  transform: translate3d(0, -20px, 0);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

.troca-enter,
.troca-leave-to {
  opacity: 0;
}

.troca-enter-active,
.troca-leave-active {
  transition: all 0.3s;
}

@keyframes bg-colors {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.filme {
  display: none;
}

.ativo {
  display: flex;
}

/* Responsivo */
@media screen and (max-width: 920px) {
  h1 {
    font-size: 3rem;
  }
  main {
    padding-top: 100px;
  }
}

@media screen and (max-width: 600px) {
  h1 {
    font-size: 2.535rem;
    padding-bottom: 16px;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.735rem;
  }
  p {
    font-size: 1rem;
  }
  .btn {
    font-size: 0.8rem;
    padding: 8px 30px;
  }
}
</style>
