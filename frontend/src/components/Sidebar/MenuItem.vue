<template>
  <component
  v-if="item.isVisible"
  :is="item.route ? 'router-link' : 'button'"
  v-bind="(item.route && { to: item.route })"
  @click.native="$emit('handleClick')"
  >
    <span class="material-icons-outlined">{{ item.icon }}</span>
    <span class="label">{{ item.label }}</span>
  </component>
</template>

<script setup lang="ts">
defineProps<{
  item: {
    label: string
    route?: null | string
    icon: string
    isVisible: boolean
  }
}>()
</script>

<style lang="scss" scoped>
button, a{
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap:10px;
  width: 100%;
  padding: 8px;
  border-radius: 0.25rem;

  span:first-of-type{
    opacity: 0.5;
    transition: 0.2s ease opacity;
  }

  span:last-of-type{
    font-size: 0.85rem;
    font-weight: 700;

  }

  &.router-link-active{

    span:first-of-type{
      color: var(--theme-color);
      opacity: 1;
    }
  }

  &:hover{

    span:first-of-type{
      opacity: 1;
    }
  }
}
</style>