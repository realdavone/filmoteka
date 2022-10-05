<template>
  <button class="sub-nav-button" @click="$emit('handleClick')">
    <slot name="icon" />
  </button>
</template>

<style lang="scss" scoped>
button[disabled],button:disabled{
  cursor:default;
  opacity:0.5;
  background:none;
}
button.sub-nav-button{
  display:flex;
  justify-content:center;
  align-items:center;
  height:36px;
  width:36px;
  border-radius:18px;
  padding:0 15px;
  gap:10px;
  transition:0.2s ease all;
  color:var(--theme-color);
  overflow:hidden;
  background-color:var(--card-color);
  &.placeholder{
    background:var(--card-color);
    cursor:default;
  }
}
:slotted(span){
  font-size:1rem;
  transition:0.2s ease opacity
}
</style>