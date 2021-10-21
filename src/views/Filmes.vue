<template>
  <transition mode="out-in">
    <section>
      <ul class="paginas">
        <li><router-link to="/">Início</router-link></li>
        <li><router-link to="/movie?page=1">Filmes</router-link></li>
      </ul>
      <h1>Filmes online e grátis</h1>
      <FiltroContent :type="path" />
      <FeedContent />
    </section>
  </transition>
</template>

<script>
import FiltroContent from "@/components/FiltroContent.vue";
import FeedContent from "@/components/FeedContent.vue";

export default {
  name: "Filmes",
  components: {
    FeedContent,
    FiltroContent,
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
};
</script>

<style>
</style>