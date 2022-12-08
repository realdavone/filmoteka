<template>
  <component
  v-if="link.shown"
  tabindex="0"
  :is="link.isLink ? 'router-link' : 'button'"
  class="menu-item"
  v-bind="{ ...(link.isLink ? { to: link.route } : null) }"
  @click.native="emit('click')">
    <div class="icon" v-html="link.icon"></div>
    <span class="label">{{link.label}}</span>
  </component>
</template>

<script setup lang="ts">
const { link } = defineProps<{link: {
  icon: string
  isLink: boolean 
  label: string
  route: string
  shown: boolean
}}>()

const emit = defineEmits(['click'])
</script>

<style lang="scss" scoped>
a.menu-item, button.menu-item{
  display:flex;
  align-items:center;
  flex-direction:column;
  justify-content:center;
  gap:0.75rem;
  padding:0.5rem 0.75rem;
  border-radius:0.75rem;
  overflow:hidden;
  transition:0.2s ease background-color;
  aspect-ratio:1;
  background:var(--card-color-hover);
  &.active{
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  div.icon{
    width:25px;
    text-align:center;
    line-height:1;
  }
  span:last-of-type{
    font-size:0.7rem;
    opacity:0.75;
  }
  &.router-link-exact-active{ background:var(--theme-color); color:white }
}
</style>