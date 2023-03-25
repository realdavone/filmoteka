<template>
  <button class="nav-button" @click="$emit('handleClick')">
    <div class="icon">
      <slot />
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
  position: relative;

  &:active{
    background-color:var(--background-color-alpha);
    outline:1px solid var(--card-color-hover);
  }

  &[data-count]::after{
    content: attr(data-count);
    background-color: var(--theme-color);
    height: 18px;
    aspect-ratio: 1;
    position: absolute;
    top: 5px;
    right: 5px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
    color:white;
    font-size: 10px;
    animation-duration: 0.3s;
    animation-name: appear;
  }

  &[data-notification]::after{
    content: '';
    position: absolute;
    top:10px;
    right:10px;
    display:block;
    width:7px;
    aspect-ratio: 1;
    background-color:var(--theme-color);
    border-radius:50%;
  }
}
div.icon{
  position: relative;
}

@keyframes appear{
  0%{
    transform: scale(0)
  }
  100%{
    transform: scale(1)
  }
}
</style>