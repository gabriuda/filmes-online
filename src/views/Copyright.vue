<template>
  <section>
    <h1>Aviso Importante</h1>
    <p class="p-copy">Nós não hospedamos quaisquer filmes e/ou informações em nosso servidor. Todos os dados são indexados de forma automática, e organizados em nosso layout. Aos filmes, fazemos a incorporação (embed), de um servidor externo, com links dinâmicos. Não nos responsabilizamos pelo conteúdo encontrado por meio desses links externos.</p>
    <ul>
      <li><p>- Pôsteres pegos do site IMDB.</p></li>
      <li><p>- Informações também pegas do IMDB.</p></li>
      <li><p>- Filmes indexados por meio do HDFOG.</p></li>
      <li><p></p></li>
    </ul>
  </section>  
</template>

<script>
  export default {
    name: "Copyright"
  }
</script>

<style scoped>
  h1 {
    background: url('../assets/aviso.svg') no-repeat center right;
  }

  .p-copy {
    margin-top: 30px;
  }

  ul {
    margin-top: 30px;
  }

  ul li {
    margin-top: 10px;
  }

  @media screen and (max-width: 920px) {
    h1 {
      font-size: 3rem;
      background-size: 60px;
    }
  }

  @media screen and (max-width: 460px) {
    h1 {
      font-size: 2.6rem;
      background-size: 40px;
    }
  }
</style>