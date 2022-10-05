<template>
  <section>
    <span class="user-select-none">{{props.text||'Žiadne výsledky'}}</span>
  </section>
</template>

<script setup>
const props = defineProps({ text: String })
</script>