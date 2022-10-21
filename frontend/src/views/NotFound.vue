<template>
  <main class="container main user-select-none">
    <div align="center">
      <span class="num">404</span><br>
      <span>Hľadaný obsah nebol nájdený</span>
    </div>
    <router-link to="/">
      <span>Vrátiť sa na domovskú stránku</span>
      <span class="material-symbols-outlined">home</span>
    </router-link>
  </main>
</template>

<style lang="scss" scoped>
main.main{
  display:flex;
  justify-content:center;
  align-items:center;
  gap:10px;
  flex-direction:column;
  width:100%;
  height:calc(100vh - var(--footer-height) - var(--nav-height));
  span.num{
    font-size:2rem;
    font-weight:900;
  }
  a{
    display:flex;
    align-items:center;
    gap:8px;
    background:var(--theme-color);
    border-radius:8px;
    padding:8px 16px;
    transition:0.2s ease background;
    font-weight:700;
    color:var(--font-color-dark);
  }
}
</style>