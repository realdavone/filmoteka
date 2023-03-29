<template>
  <Teleport to="body">
    <Backdrop v-if="dialogOpen">
      <div ref="dialog" class="dialog">
        <header
          v-if="content.header"
          v-font:medium
        >{{ content.header }}</header>
        <div v-font:medium class="body">{{ content.body }}</div>
        <div class="buttons">
          <button
            v-font:medium
            class="confirm"
            @click="resolve"
          >{{ content.confirmText }}</button>
          <button
            v-font:medium
            class="cancel"
            @click="reject"
          >{{ content.cancelText }}</button>
        </div>
      </div>
    </Backdrop>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onClickOutside } from '@vueuse/core'

import Backdrop from './Modal/Backdrop.vue'

const dialogOpen = ref(false)
const dialog = ref<HTMLDivElement | null>(null)

let promiseResolved: (value: unknown) => void, promiseRejected: (value: unknown) => void

const content = reactive<{
  header: undefined | string
  body: undefined | string
  cancelText: undefined | string
  confirmText: undefined | string
}>({
  header: undefined,
  body: undefined,
  cancelText: undefined,
  confirmText: undefined
})

async function handleDialogWindow({
  header, body, cancelText, confirmText
}: {
  header?: string
  body: string
  cancelText: string
  confirmText: string
}) {
  dialogOpen.value = true

  content.header = header
  content.body = body
  content.confirmText = confirmText
  content.cancelText = cancelText

  return new Promise((resolve, reject) => {
    promiseRejected = reject
    promiseResolved = resolve
  })
}

function reject() {
  dialogOpen.value = false
  promiseRejected('CANCEL')
}

function resolve() {
  dialogOpen.value = false
  promiseResolved('CONFIRM')
}

onClickOutside(dialog, reject)

defineExpose({
  handleDialogWindow,
  dialogOpen
})
</script>

<style lang="scss" scoped>
div.dialog{
  background-color: var(--background-color);
  border-radius: 8px;
  overflow: hidden;
  max-width: 300px;
  width: fit-content;
  box-shadow: var(--modal-box-shadow);

  header {
    background-color: var(--card-color-hover);
    padding: 10px 15px;
  }

  div.body{
    padding: 10px 15px;
    pointer-events: none;
    text-align: center;
  }

  div.buttons{
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 10px 15px;

    button {
      padding: 5px 10px;
      line-height: 1;
      border-radius: 4px;

      &.cancel{
        background-color: crimson;
        color: white;
      }

      &.confirm:hover {
        background-color: var(--card-color-hover);
      }
    }
  }
}
</style>