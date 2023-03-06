<template>
  <div class="buttons">
    <button
    v-for="b in props.numberOfButtons"
    @click="emit('changeButton', {
      index: b - 1,
      clear: true
    })"
    :class="props.activeIndex === (b - 1) && 'active'">
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  numberOfButtons?: number
  activeIndex?: number
}>()

const emit = defineEmits<{
  (e: 'changeButton', { index, clear }: { index: number, clear?: boolean }): void
}>()
</script>

<style lang="scss" scoped>
div.buttons{
  display: flex;
  justify-content: center;
  gap:14px;
  margin-top: auto;

  button{
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: var(--font-color);
    opacity: 0.1;
    transition: 0.2s ease all;

    &.active{
      opacity: 1;
      transform: scale(1.2)
    }
  }
}
</style>