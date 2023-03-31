<template>
  <div class="input">
    <input
      v-font:medium
      :type="inputType"
      :placeholder="placeholder"
      :required="required"
      v-model="inputValue"
      :name="type"
      :autocomplete="type"
      autocapitalize="off"
      autocorrect="off"
    />
    <button
      v-if="inputValue"
      @click="handleClick(type)"
      type="button"
    >
      <span
        v-if="type === 'password'"
        class="material-icons-outlined"
        style="font-size: 12px">
        {{ inputType === type ? 'visibility' : 'visibility_off' }}
      </span>
      <span v-else>&times;</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const { placeholder, type, required } = defineProps<{
  placeholder: string
  type: string
  required: boolean
}>()

const inputValue = ref('')
const inputType = ref(type)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

watchEffect(() => {
  emit('update:modelValue', inputValue.value)
})

function handleClick(action: string) {
  switch(action) {
    case 'password': {
      if(inputType.value === type) inputType.value = 'text'
      else inputType.value = type
      break
    }
    default: {
      inputValue.value = ''
      break
    }
  }
}
</script>

<style lang="scss" scoped>
div.input{
  display:flex;
  align-items:stretch;
  border-radius:4px;
  overflow:hidden;
  background-color:var(--card-color);
  height: 40px;
  outline:2px solid rgb(52, 52, 52);
  gap:5px;

  input{
    padding:10px 10px;
    width:100%;
    background-color:inherit;
    color:inherit;
    min-height: 40px;
  }

  button {
    font-size: 20px;
    opacity: 0.5;
    padding: 0 5px;
  }

  &:focus-within{
    outline:2px solid var(--theme-color);
  }
}
</style>