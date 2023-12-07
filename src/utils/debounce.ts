export default function debounce(fn: () => void, wait = 200, isImmediate = true) {
  let timer: null = null,
    flag = true
  if (isImmediate) {
    return function () {
      clearTimeout(timer)
      if (flag) {
        fn.apply(this, arguments)
        flag = false
      }
      timer = setTimeout(() => {
        flag = true
      }, wait)
    }
  }
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait)
  }
}
