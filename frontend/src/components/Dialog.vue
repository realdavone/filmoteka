<template>
  <Teleport to="body">
    <div v-if="dialogOpen" class="backdrop">
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
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onClickOutside } from '@vueuse/core'

const dialogOpen = ref(false)
const dialog = ref<HTMLDivElement | null>(null)

let promiseResolved: (value: unknown) => void
let promiseRejected: (value: unknown) => void

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
div.backdrop{
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100vh;
  background-color: var(--background-color-alpha);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  isolation: isolate;
  div.dialog{
    background-color: var(--background-color);
    border-radius: 8px;
    overflow: hidden;
    max-width: 300px;
    width: fit-content;

    header {
      background-color: var(--card-color-hover);
      padding: 10px 15px;
    }

    div.body{
      background-color: var(--card-color);
      padding: 10px 15px;
      pointer-events: none;
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
}
</style>