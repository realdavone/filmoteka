
function debounce(cb: (...args: unknown[]) => void, delay = 1000) {
  let timeout: ReturnType<typeof setTimeout>

  return function(...args: unknown[]) {
    clearTimeout(timeout)
    timeout = setTimeout(function(){
      cb(...args)
    }, delay)
  }
}

export default debounce