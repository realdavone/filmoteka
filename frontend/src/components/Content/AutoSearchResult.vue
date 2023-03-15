<template>
  <div class="search-result">
    <div class="poster-holder">
      <img
        v-if="props.img"
        :src="`https://image.tmdb.org/t/p/w92${props.img}`"
        :alt="props.label"
        loading="lazy"
      />
      <span v-else class="material-icons-outlined">history</span>
    </div>
    <span v-font:small>{{ props.label }}</span>
    <button v-font:small v-if="onRemove" class="remove" @click.stop="onRemove?.(props.label)">Zmazať</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  img?: string | null
  label: string
  onRemove?: (item: string) => void
}>()
</script>

<style lang="scss" scoped>
div.search-result{
  display: flex;
  align-items: center;
  padding:4px 10px;
  gap:10px;
  cursor: pointer;

  div.poster-holder{
    width: 34px;
    height: 34px;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img{
      width:100%;
      height: 100%;
      object-fit: cover;
    }
  }

  button.remove{
    margin-left: auto;

    &:hover{
      text-decoration: underline;
    }
  }

  &:hover{
    background-color: var(--card-color-hover);
  }
}
</style>