import { onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'

function useEvent({
  target,
  event,
  callback
}: {
  target: HTMLElement | Window | Document,
  event: string,
  callback: EventListenerOrEventListenerObject
}){
  onMounted(() => target.addEventListener(event, callback))
  onActivated(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
  onDeactivated(() => target.removeEventListener(event, callback))

  return {
    addListener: () => target.addEventListener(event, callback),
    removeListener: () => target.removeEventListener(event, callback)
  }
}

export default useEvent