<template>
  <section @click="emit('playEpisode', { season: info.season - 1, episode: info.episode - 1 })" :class="`episode-card ${playable && 'playable'} user-select-none`">
    <div class="episode-info">
      <span class="label">
        <slot name="label" />
      </span>
      <div class="info">
        <span>{{`${info.season}.${info.episode}`}}</span>          
        <span>{{new Date(info.date).toLocaleDateString('sk-SK', { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric' })}}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { playable, info } = defineProps<{
  playable: boolean
  info: {
    season: number
    episode: number
    date: string
  }
}>()
const emit = defineEmits(['playEpisode'])
</script>

<style lang="scss" scoped>
section.episode-card{
  flex:1;
  display:flex;
  align-items:stretch;
  position:relative;
  gap:0.5rem;
  background-color:var(--card-color);
  padding:0.5rem 0.75rem;
  border-radius:0.75rem;
  &.playable{
    cursor:pointer;
    transition:0.2s ease background-color;
    &:hover{
      background-color:var(--card-color-hover);
    }
  }
  span.label{
    font-size:0.75rem;
    font-weight:900;
    text-transform:uppercase;
    margin-bottom:2px;
    line-height:1;
  }
  div.info{
    display:flex;
    gap:0.5rem;
    font-size:0.75rem;
    align-items:center;
    line-height:1;
    span:first-of-type{
      font-family:monospace,'Roboto Mono';
      color:var(--theme-color);
      font-weight:700;
    }
    span:last-of-type{
      color:var(--secondary-text-color);
    }
  }
}
</style>