<template>
  <footer>
    <div class="footer-container">
      <p>&copy; OnlineFilmes</p>
    </div>
  </footer>  
</template>

<script>
export default {
  name: "TheFooter"
}
</script>

<style scoped>
  footer {
    position: relative;
    top: 75px;
  }
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    border-top: 1px solid var(--branco);
    padding: 20px;
  }
  .footer-container p {
    text-align: center;
  }
</style>