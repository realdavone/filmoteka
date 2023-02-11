import { onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'

export default function({
  target,
  event,
  callback
}:{
  target: HTMLElement | Window | Document,
  event: any,
  callback: () => void
}){
  onMounted(() => { target.addEventListener(event, callback) })
  onActivated(() => { target.addEventListener(event, callback) })
  onUnmounted(() => { target.removeEventListener(event, callback) })
  onDeactivated(() => { target.removeEventListener(event, callback) })
}