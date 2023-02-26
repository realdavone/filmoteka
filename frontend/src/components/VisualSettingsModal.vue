<template>
  <Modal @close="$emit('close')">
    <template #modal>
      <div class="modal" ref="modal">
        <header>Vizuálne nastavenia</header>
        <div class="label">Téma</div>
        <div class="theme-picker">
          <button class="theme-button dark" @click="store.methods.settings.darkTheme.set(true)" :data-active="store.state.settings.darkTheme === true" title="Tmavý režim">
            <span class="material-icons">dark_mode</span>
          </button>
          <button class="theme-button light" @click="store.methods.settings.darkTheme.set(false)" :data-active="store.state.settings.darkTheme === false" title="Svetlý režim">
            <span class="material-icons-outlined">light_mode</span>
          </button>
        </div>
        <div class="label">Farebný motív</div>
        <div class="color-picker">
          <button v-for="(color, i) in store.state.settings.themeColors.colors"
          :key="i"
          class="color"
          :style="`background-color:${color}`"
          @click="store.methods.settings.themeColor.set(color)"
          :data-active="store.methods.settings.themeColor.get()===color">
          </button>
        </div>
        <BasicButton type="close" style="align-self: center" @handleClick="$emit('close')">Zavrieť</BasicButton>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from './Modal.vue'
import { inject, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import BasicButton from './Buttons/BasicButton.vue';

const modal = ref<HTMLDivElement | null>(null)

const store = inject<any>('store')

const emit = defineEmits(['close'])

onClickOutside(modal, () => emit('close'))
</script>

<style lang="scss" scoped>
div.modal{
  padding:0.75rem 1rem 1rem;
  background-color:var(--background-color);
  border-radius:0.75rem;
  display:flex;
  flex-direction:column;
  gap:1rem;
  width:100%;
  max-width:400px;
  box-shadow: var(--modal-box-shadow);

  header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-size:1rem;
    font-weight:900;
  }

  div.label{
    font-size: 0.85rem;
  }
}
div.theme-picker{
  display:flex;
  gap:1rem;
  button.theme-button{
    width:100%;
    padding:4px 8px;
    border-radius:0.5rem;
    display:flex;
    gap:1rem;
    align-items:center;
    justify-content:center;
    position:relative;
    &.dark{
      background:var(--dark-background);
      color:var(--font-color-dark);
    }
    &.light{
      background:var(--light-background);
      color:var(--font-color-light);
    }
    &[data-active=true]::after{
      position:absolute;
      top:-7px;
      right:5px;
      font-weight:900; 
      font-size:0.75rem;
      content:'\2713'
    }
  }
}
div.color-picker{
  display:flex;
  gap:8px;
  button.color{
    width:100%;
    aspect-ratio:1;
    border-radius:100px;
    position:relative;
    color:var(--font-color-dark);
    overflow:hidden;
    &[data-active=true]::after{
      content:'\2713';
      font-size: 1.25rem;
    }
  }
}
</style>