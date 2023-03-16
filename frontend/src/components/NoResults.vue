<template>
  <section>
    <span v-font:medium class="user-select-none">{{text || 'Žiadne výsledky'}}</span>
  </section>
</template>

<script setup lang="ts">
const { text } = defineProps<{ text?: string }>()
</script>