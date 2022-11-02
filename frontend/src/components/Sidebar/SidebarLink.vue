<template>
  <router-link tabindex="0" v-if="link.shown" class="menu-link" :to="link.route" @click.native="emit('close')">
    <div class="icon" v-html="link.icon"></div>
    <span class="label">{{link.label}}</span>
  </router-link>
</template>

<script setup>
const { link } = defineProps({ link: Object })
const emit = defineEmits(['close'])
</script>

<style lang="scss" scoped>
a.menu-link{
  display:flex;
  align-items:center;
  gap:1rem;
  padding:12px 1rem;
  border-left:0.5rem solid transparent;
  border-radius:0.5rem;
  div.icon{
    width:25px;
    text-align:center;
    line-height:1;
  }
  span:nth-child(1){ font-size:1.25rem }
  span:nth-child(2){ font-size:0.85rem }
  &:hover, &.router-link-exact-active{ background:var(--card-color-hover) }
  &.router-link-exact-active{ border-left:6px solid var(--theme-color) }
}
</style>