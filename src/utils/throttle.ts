// 节流函数
const throttle = (func: () => void, delay: number) => {
  // 缓存一个定时器
  let timer: null | number = null
  // 这里返回的函数是每次实际调用的节流函数
  return function (...args: any[]) {
    if (!timer) {
      //判断timer是否有值,如果没有则说明定时器不存在即可继续执行
      func.apply(this, arguments)
      timer = setTimeout(() => {
        //关
        timer = null //开
      }, delay)
    }
  }
}
export default throttle
