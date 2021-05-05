import type { DragOptions } from './types'

let isDragging = false

export default function(element: HTMLDivElement, options: DragOptions) {
  const moveFn = function(e: MouseEvent) {
    options.drag(e)
  }
  const upFn = function(e: MouseEvent) {
    document.removeEventListener('mousemove', moveFn)
    document.removeEventListener('mouseup', upFn)
    document.onselectstart = null
    document.ondragstart = null

    isDragging = false
    options.end(e)
  }
  element.addEventListener('mousedown', function(e) {
    if (isDragging) return
    document.onselectstart = function() {
      return false
    }
    document.ondragstart = function() {
      return false
    }

    document.addEventListener('mousemove', moveFn)
    document.addEventListener('mouseup', upFn)
    isDragging = true
    options.start?.(e)
  })
}
