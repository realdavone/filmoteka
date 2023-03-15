<template>
  <fieldset class="select">
    <button
      v-font:small
      class="active"
      @click="areValuesVisible = !areValuesVisible"
    >{{options.get(modelValue)}}</button>
    <Transition name="fade">
      <div ref="values" v-show="areValuesVisible" class="values">
        <div
          v-font:small
          v-for="option in options"
          :key="option[0]"
          @click="handleChange(option)"
          :class="`option ${options.get(modelValue) === option[1] && 'active'}`"
          role="button"
        >{{option[1]}}</div>
      </div>
    </Transition>
  </fieldset>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const { options, modelValue } = defineProps<{
  options: Map<string | number, string>
  modelValue: string | number
}>()

const emit = defineEmits(['update:modelValue'])

const values = ref<HTMLElement | null>(null)
const areValuesVisible = ref(false)

const handleChange = (value: Array<any>) => {
  emit('update:modelValue', value[0])
  areValuesVisible.value = false
}

onClickOutside(values, () => areValuesVisible.value = false)
</script>

<style lang="scss" scoped> 
fieldset.select{
  position:relative;
  border: none;
  button.active{
    text-align: center;
    background-color: var(--card-color);
    padding: 8px;
    border-radius: 4px;
    width: 100%;
  }
  div.values{
    z-index:2;
    border-radius: 4px;
    padding:10px;
    top:calc(100% + 8px);
    left:0;
    position:absolute;
    display:grid;
    background-color:var(--card-color);
    width:100%;
    min-width:100%;
    grid-template-columns:repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
    overflow:auto;
    max-height:50vh;
    box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.75);
    div.option{
      padding:4px 8px;
      border-radius:4px;
      text-align:left;
      transition:0.2s ease background-color;
      cursor: pointer;
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