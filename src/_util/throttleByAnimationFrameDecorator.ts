import raf from 'rc-util/lib/raf'

// 节流函数
export function throttleByAnimationFrame(fn: (...args: any[]) => void) {
  let requestId: number | null

  const later = (args: any[]) => () => {
    requestId = null
    fn(...args)
  }

  const throttled = (...args: any[]) => {
    if (requestId == null) {
      requestId = raf(later(args))
    }
  };

  (throttled as any).cancel = () => raf.cancel(requestId!)

  return throttled
}

// 节流装饰器
export function throttleByAnimationFrameDecorator() {
  return function throttle(target: any, key: string, descriptor: any) {
    const fn = descriptor.value
    let definingProperty = false
    return {
      configurable: true,
      get() {
        if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
          return fn
        }

        const boundFn = throttleByAnimationFrame(fn.bind(this))
        definingProperty = true
        Object.defineProperty(this, key, {
          value: boundFn,
          configurable: true,
          writable: true
        })
        definingProperty = false
        return boundFn
      }
    }
  }
}
