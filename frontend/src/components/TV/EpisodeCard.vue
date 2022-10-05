<template>
  <section @click="emit('playEpisode', { season: info.season - 1, episode: info.episode - 1 })" class="episode-card user-select-none" :style="`cursor:${playable === true ? 'pointer' : 'default'}`">
    <div class="episode-info">
      <span class="label">
        <slot name="label" />
      </span>
      <div class="info">
        <div style="display:flex;gap:8px;font-size:0.8rem;align-items:center;">
          <b style="color:var(--theme-color)">{{`S${info.season}.E${info.episode}`}}</b>          
          <span style="color:var(--secondary-text-color)">{{new Date(info.date).toLocaleDateString('sk-SK', { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric' })}}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { playable, info } = defineProps({
  playable: Boolean,
  info: {
    season: Number,
    episode: Number,
    date: String
  }
})
const emit = defineEmits(['playEpisode'])
</script>

<style lang="scss" scoped>
section.episode-card{
  flex:1;
  border-radius:10px;
  display:flex;
  align-items:stretch;
  position:relative;
  gap:0.5rem;
  span.label{
    font-family: 'Oswald', sans-serif;
    font-size:0.8rem;
    font-weight:700;
    text-transform:uppercase;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom:2px;
  }
  &::before{
    content:'';
    width:5px;
    background-color:var(--theme-color);
    border-radius:3px;
  }
}
</style>