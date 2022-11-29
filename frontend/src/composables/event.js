import { onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'

const useEvent = ({ target, event, callback }) => {
  onMounted(() => { target.addEventListener(event, callback) })
  onActivated(() => { target.addEventListener(event, callback) })
  onUnmounted(() => { target.removeEventListener(event, callback) })
  onDeactivated(() => { target.removeEventListener(event, callback) })
}

export default useEvent