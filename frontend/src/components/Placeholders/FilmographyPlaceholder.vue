<template>
  <div class="filmography">
    <section class="filmography"></section>
  </div>
</template>

<style lang="scss" scoped>
  div.filmography{
    min-width:450px;
    max-width:450px;
    display:flex;
    gap:20px;
    flex-direction:column;

    div.title{
      height:1.75rem;
      background:var(--font-color);
      width:200px;
      border-radius:6px;
    }
    section.filmography{
      width:100%;
      height:30vh;
      border-radius:8px;
    }
  }
  @media screen and (max-width: 1200px) {
    div.filmography{
      min-width:initial;
      max-width:initial;
    }
  }
</style>