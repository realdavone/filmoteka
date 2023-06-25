import { DirectiveBinding } from 'vue'

interface FontDirectiveBinding extends DirectiveBinding {
  arg?: string
}

function font(el: HTMLElement, binding: FontDirectiveBinding) {
  let size: number | undefined
  switch(binding.arg){
    case 'small':
      size = 1.2
      break
    case 'medium': 
      size = 1.6
      break
    case 'large':
      size = 2.4
      break
    default:
      size = 1.6
  }
  el.style.fontSize = `${size}rem`
}

export default font