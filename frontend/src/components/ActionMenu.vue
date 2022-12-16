<template>
    <div class="buttons">
      <slot>
        <button class="placeholder" v-for="index in 4" :key="index"></button>
      </slot>
    </div>
</template>

<style lang="scss">
div.buttons{
  --button-height:56px;

  display:flex;
  gap:0.5rem;
  justify-content:center;
  flex-wrap:wrap;
  button.placeholder{
    height:var(--button-height);
    aspect-ratio:1;
    background-color:var(--card-color);
    border-radius:50%;
    cursor:default;
  }
}
@media screen and (max-width: 600px){
  div.buttons{
    --button-height:40px;
  }
}
</style>