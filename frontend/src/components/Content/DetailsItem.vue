<template>
  <div class="item">
    <span class="label">{{label}}</span>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { label } = defineProps<{label: string}>()
</script>

<style lang="scss" scoped>
div.item{
  display:flex;
  flex-direction:column;
  gap:0.25rem;
  span.label{ font-weight:700 }
  div.content{
    font-size:0.75rem;
    line-height:1.4;
    color:var(--secondary-text-color);
  }
}
</style>