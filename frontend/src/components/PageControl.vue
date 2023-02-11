<template>
  <section class="page-control" v-if="parseInt(props.pages.total as string) > 1">
    <button
    :class="{ 'disabled': parseInt(props.pages.current as string) === 1 }"
    :disabled="parseInt(props.pages.current as string) === 1"
    @click="$emit('navigate', (parseInt(props.pages.current as string) - 1))"
    class="arrow-button">
      &#10094;
    </button>
    <span class="current-page">{{props.pages.current}}</span>
    <button
    :class="{ 'disabled': parseInt(props.pages.current as string) === parseInt(props.pages.total as string) }"
    :disabled="parseInt(props.pages.current as string) === parseInt(props.pages.total as string)"
    class="arrow-button"
    @click="$emit('navigate', (parseInt(props.pages.current as string) + 1))">
      &#10095;
    </button>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  pages: {
    current: string | number
    total: string | number
  }
}>()

</script>

<style lang="scss" scoped>
section.page-control{
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top:var(--container-padding);
  span.current-page{
    display:inline-block;
    text-align:center;
    font-size:1.25rem;
    width:40px;
    font-weight:900;
    user-select:none;
  }
  button.arrow-button{
    background-color:var(--card-color);
    width:40px;
    height:30px;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    border-radius:0.5rem;
    transition:0.2s ease background-color;
    &.disabled{
      cursor:default;
      visibility:hidden;
      pointer-events:none;
    }
    &:hover:not(.disabled){
      background-color:var(--card-color-hover);
    }
  }
}
</style>