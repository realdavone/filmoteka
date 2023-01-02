<template>
  <component
  v-if="link.shown"
  tabindex="0"
  :is="link.isLink ? 'router-link' : 'button'"
  class="menu-item"
  v-bind="{ ...(link.isLink ? { to: link.route } : null) }"
  @click.native="emit('click')">
    <div class="icon">
      <span class="material-icons-outlined">{{ link.icon }}</span>
    </div>
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
  gap:0.25rem;
  padding:0.5rem 0.75rem;
  overflow:hidden;
  transition:0.2s ease background-color;
  aspect-ratio:1;
  div.icon{
    width:25px;
    text-align:center;
    line-height:1;
    span{
      font-size:1.5rem;
    }
  }
  span.label{
    font-size:0.75rem;
  }
  &.router-link-exact-active{
    color:var(--theme-color);
    font-weight:700;
  }
}
</style>