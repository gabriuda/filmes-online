<template>
  <div>
    <ul>
      <li v-for="(letra, index) in letras" :key="index">
        <input
          type="radio"
          :id="letra"
          name="alfabeto"
          :value="letra"
          v-model="letraInicial"
        />
        <label :for="letra">{{ letra }}</label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CategoriasLetras",
  props: ["letras"],
  data() {
    return {
      letraInicial: "",
    };
  },
  watch: {
    letraInicial() {
      this.$router
        .push(`/categorias?letter=${this.letraInicial.toUpperCase()}`)
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
div {
  position: relative;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: ms-autohiding-scrollbar;
}

ul {
  display: flex;
  max-width: 500px;
  gap: 8px;
  margin-bottom: 20px;
}

ul li input {
  display: none;
}

ul li label {
  font-family: "Karla", sans-serif;
  display: block;
  width: 40px;
  height: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--azul);
  color: var(--branco);
  transition: 0.2s;
  opacity: 0.75;
  cursor: pointer;
}

ul li input:checked ~ label,
label:hover {
  opacity: 1;
  border-color: var(--branco);
}
</style>