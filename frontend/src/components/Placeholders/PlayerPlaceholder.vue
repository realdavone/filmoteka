<template>
  <div class="player-holder">
    <div class="player"></div>
  </div>
</template>

<style lang="scss" scoped>
div.player-holder{
  display:flex;
  flex-direction:column;
  gap:20px;
  background-color:var(--player-background-color);
  div.player{
    width:var(--player-width);
    min-width:var(--player-width);
    aspect-ratio:16/9!important;
    display:flex;
    justify-content:center;
    align-items:center;
    margin:0 auto;
    position:relative;
    overflow:hidden;
  }
}
@media screen and (max-width: 1300px){
  div.player-holder{ margin:0 calc(0px - var(--container-padding)) }
  div.player{
    width:100%!important;
    min-width:initial!important;
    max-width:750px;
  }
}
</style>