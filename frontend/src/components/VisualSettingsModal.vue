<template>
  <Modal :unscrollable-on-mounted="false" @close="$emit('close')">
    <template #modal>
      <div class="modal user-select-none" ref="modal">
        <header v-font:large>Vizuálne nastavenia</header>
        <div v-font:medium>Téma</div>
        <div class="theme-picker">
          <button class="theme-button dark" @click="store.methods.settings.darkTheme.set(true)" :data-active="store.state.settings.darkTheme === true" title="Tmavý režim">
            <span class="material-icons">dark_mode</span>
          </button>
          <button class="theme-button light" @click="store.methods.settings.darkTheme.set(false)" :data-active="store.state.settings.darkTheme === false" title="Svetlý režim">
            <span class="material-icons-outlined">light_mode</span>
          </button>
        </div>
        <div v-font:medium>Farebný motív</div>
        <div class="color-picker">
          <button v-for="(color, i) in store.state.settings.themeColors.colors"
            :key="i"
            class="color"
            :style="`background-color:${color}`"
            @click="store.methods.settings.themeColor.set(color)"
            :data-active="store.methods.settings.themeColor.get()===color"
          ></button>
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
  padding:10px 15px 15px;
  background-color:var(--background-color);
  border-radius:10px;
  display:flex;
  flex-direction:column;
  gap:15px;
  width:100%;
  max-width:400px;
  box-shadow: var(--modal-box-shadow);

  header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-weight:900;
  }
}
div.theme-picker{
  display:flex;
  gap:15px;
  button.theme-button{
    width:100%;
    padding:4px 8px;
    border-radius: 10px;
    display:flex;
    gap:15px;
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
      font-size:10px;
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
      font-size: 20px;
    }
  }
}
</style>