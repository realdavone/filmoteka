<template>
  <article v-auto-animate>
    <div tabindex="0" class="label" @click="opened = !opened">
      <slot name="label" />
    </div>
    <section v-if="opened" class="content">
      <slot name="content" />
    </section>
  </article>
</template>

<script setup>
import { ref } from 'vue'

const opened = ref(false)
</script>

<style lang="scss" scoped>
div.label{
  cursor:pointer;
  list-style-type:none;
  background-color:var(--card-color-hover);
  padding:5px 10px;
  border-radius:6px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  user-select:none;
  font-size:0.85rem;
}
section.content{
  padding:0.5rem 0;
  display:flex;
  flex-direction:column;
  gap:1rem;
}
</style>