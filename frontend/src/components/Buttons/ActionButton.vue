<template>
  <button class="sub-nav-button" @click="$emit('handleClick')">
    <slot name="icon" />
    <slot name="label" />
  </button>
</template>

<style lang="scss" scoped>
button.sub-nav-button{
  transition:0.2s ease all;
  overflow:hidden;
  background-color:var(--card-color-hover);
  display:flex;
  align-items:center;
  gap:0.5rem;
  padding:0.5rem;
  border-radius:0.25rem;
  line-height:1;
  &.placeholder{
    background:var(--card-color);
    cursor:default;
  }
  &:disabled, &[disabled]{
    cursor:default;
    opacity:0.5;
    background-color:transparent;
  }
}
:slotted(span.label){
  font-size:0.85rem;
}
:slotted(span.icon){
  font-size:1rem;
  display:none;
}
@media screen and (max-width: 600px){
  :slotted(span.label){ display:none }
  :slotted(span.icon){ display:initial }
}
</style>