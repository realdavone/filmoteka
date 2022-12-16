<template>
  <div class="select">
    <div class="active-selector" @click="areValuesVisible = !areValuesVisible">{{options.get(modelValue)}}</div>
    <Transition name="fade">
      <div ref="values" v-show="areValuesVisible" class="values">
        <div v-for="option in options" :key="option[0]" @click="handleChange(option)" :class="`option ${options.get(modelValue) === option[1] && 'active'}`">{{option[1]}}</div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const { options, modelValue } = defineProps<{
  options: Map<string | number, string>
  modelValue: string | number
}>()
const emit = defineEmits(['update:modelValue'])

const values = ref(null)
const areValuesVisible = ref(false)

const handleChange = (value: Array<any>) => {
  emit('update:modelValue', value[0])
  areValuesVisible.value = false
}

onClickOutside(values, () => areValuesVisible.value = false)
</script>

<style lang="scss" scoped> 
div.select{
  background-color:var(--card-color);
  padding:0.5rem;
  border-radius:0.5rem;
  cursor:pointer;
  position:relative;
  div.active-selector{
    font-size:0.75rem;
    text-align:center;
  }
  div.values{
    z-index:2;
    border-radius:0.5rem;
    padding:0.75rem;
    top:calc(100% + 0.5rem);
    left:0;
    position:absolute;
    display:grid;
    background-color:var(--card-color);
    width:100%;
    min-width:100%;
    grid-template-columns:repeat(auto-fill, minmax(100px, 1fr));
    gap:0.65rem;
    overflow:auto;
    max-height:50vh;
    div.option{
      padding:0.25rem 0.5rem;
      border-radius:0.25rem;
      text-align:left;
      font-size:0.75rem;
      transition:0.2s ease background-color;
      &.active{
        background-color:var(--theme-color);
        color:var(--font-color-dark)
      }
      &:hover:not(.active){
        background-color:var(--card-color-hover);
      }
    }
  }
}
</style>