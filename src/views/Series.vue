<template>
  <transition mode="out-in">
    <section>
      <ul class="paginas">
        <li><router-link to="/">Início</router-link></li>
        <li><router-link to="/tv?page=1">Séries</router-link></li>
      </ul>
      <h1>Séries online e grátis</h1>
      <FiltroContent :type="path" />
      <FeedContent />
    </section>
  </transition>
</template>

<script>
import FiltroContent from "@/components/FiltroContent.vue";
import FeedContent from "@/components/FeedContent.vue";

export default {
  name: "Series",
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