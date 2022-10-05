<template>
  <button class="nav-button" @click="$emit('handleClick')">
    <div class="icon">
      <slot name="icon" />
      <slot name="notification" />
    </div>
  </button>
</template>

<style lang="scss" scoped>
button.nav-button{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  min-width:45px;
  max-width:45px;
  min-height:45px;
  max-height:45px;
  border-radius:50%;
  transition:0.2s ease background-color;
  overflow:hidden;
  &:active{background-color:var(--card-color-hover);}
}
div.icon{ position:relative }
:slotted(span.notification){
  position: absolute;
  top:3px;
  right:-3px;
  display:block;
  width:7px;
  height:7px;
  background-color:var(--theme-color);
  border-radius:50%;
}
</style>