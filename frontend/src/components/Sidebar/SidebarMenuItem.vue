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

<script setup>
const { link } = defineProps({ link: Object })
const emit = defineEmits(['click'])
</script>

<style lang="scss" scoped>
a.menu-item, button.menu-item{
  display:flex;
  align-items:center;
  gap:1rem;
  padding:0.75rem;
  border-radius:2rem;
  overflow:hidden;
  transition:0.2s ease background-color;
  &.active{
    background:var(--card-color-hover);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  div.icon{
    width:25px;
    text-align:center;
    line-height:1;
  }
  span:nth-child(1){ font-size:1.25rem }
  span:nth-child(2){ font-size:0.85rem }
  &:hover, &.router-link-exact-active{ background:var(--card-color-hover) }
}
</style>