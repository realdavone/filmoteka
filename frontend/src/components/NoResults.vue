<template>
  <section>
    <span class="user-select-none">{{text || 'Žiadne výsledky'}}</span>
  </section>
</template>

<script setup lang="ts">
const { text } = defineProps<{ text?: string }>()
</script>