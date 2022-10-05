<template>
  <router-link tabindex="0" v-if="link.shown" class="menu-link" :to="link.route" @click.native="emit('close')">
    <span class="material-symbols-outlined">{{link.icon}}</span>
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
  gap:20px;
  padding:12px 1rem;
  span:nth-child(1){ font-size:1.25rem; }
  span:nth-child(2){ font-size:0.85rem; }
  &:hover, &.router-link-exact-active{ background:var(--card-color-hover); }
  &.router-link-exact-active{ 
    color:var(--theme-color);
    span{ font-weight:700; }
  }
}
</style>