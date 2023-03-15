<template>
  <section
    @click="emit('playEpisode', { season: info.season - 1, episode: info.episode - 1 })"
    :class="`episode-card ${playable && 'playable'} user-select-none`"
  >
    <div>
      <div class="label" v-font:medium>{{ label }}</div>
      <div class="info" v-font:small>
        <span>{{ `${info.season}.${info.episode}` }}</span>          
        <span>{{ new Date(info.date).toLocaleDateString('sk-SK', { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric' }) }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { playable, info, label } = defineProps<{
  label: string
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
  gap:10px;
  box-shadow:var(--basic-box-shadow);
  padding:10px 13px;
  border-radius:12px;
  &.playable{
    cursor:pointer;
    transition:0.2s ease background-color;
    &:hover{
      background-color:var(--card-color);
    }
  }
  div.label{
    font-weight:900;
    margin-bottom:8px;
    line-height:1;
  }
  div.info{
    display:flex;
    gap:8px;
    align-items:center;
    line-height:1;
    span:first-of-type{
      color:var(--theme-color);
      font-weight:700;
    }
    span:last-of-type{
      color:var(--secondary-text-color);
    }
  }
}
</style>