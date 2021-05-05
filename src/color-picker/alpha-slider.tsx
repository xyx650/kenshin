import * as React from 'react'
import classnames from 'classnames'
import { colorPickerContext } from '@/color-picker/context'

import draggable from './draggable'
import type { DragOptions, AlphaSliderState, ColorType } from './types'
import { useState } from 'react'

type AlphaSliderProps = {
  color: ColorType,
  vertical?: boolean
}


const AlphaSlider: React.FC<AlphaSliderProps> = (props) => {
  const { vertical, color } = props

  const $el = React.useRef<HTMLDivElement>(null)
  const $bar = React.useRef<HTMLDivElement>(null)
  const $thumb = React.useRef<HTMLDivElement>(null)

  const [thumbLeft, setThumbLeft] = useState(0)
  const [thumbTop, setThumbTop] = useState(0)
  const [background, setBackground] = useState<string | undefined>(undefined)

  const context = React.useContext(colorPickerContext)

  React.useEffect(() => {
    const dragConfig: DragOptions = {
      drag: e => {handleDrag(e)},
      end: e => {handleDrag(e)}
    }
    draggable($bar.current!, dragConfig)
    draggable($thumb.current!, dragConfig)
    update()
  }, [])

  const handleClick = (e: MouseEvent) => {
    const thumb = $thumb.current
    const target = e.target
    if (target !== thumb) {
      handleDrag(e)
    }
  }

  const handleDrag = (e: MouseEvent) => {
    const { onChange } = context
    const rect = $el.current!.getBoundingClientRect()
    const thumb = $thumb.current!
    if (!vertical) {
      let left = e.clientX - rect.left
      left = Math.max(thumb.offsetWidth / 2, left)
      left = Math.min(left, rect.width - thumb.offsetWidth / 2)
      color.set('alpha', Math.round((left - thumb.offsetWidth / 2) / (rect.width - thumb.offsetWidth) * 100))
    } else {
      let top = e.clientY - rect.top
      top = Math.max(thumb.offsetHeight / 2, top)
      top = Math.min(top, rect.height - thumb.offsetHeight / 2)
      color.set('alpha', Math.round((top - thumb.offsetHeight / 2) / (rect.height - thumb.offsetHeight) * 100))
    }
    update()
    onChange(color)
  }


  const getThumbLeft = () => {
    if (vertical) return 0
    const el = $el.current!
    const alpha = color._alpha
    if (!el) return 0
    const thumb = $thumb.current!
    return Math.round(+alpha * (el.offsetWidth - thumb.offsetWidth / 2) / 100)
  }

  const getThumbTop = () => {
    if (!vertical) return 0
    const el = $el.current!
    const alpha = color._alpha
    if (!el) return 0
    const thumb = $thumb.current!
    return Math.round(+alpha * (el.offsetHeight - thumb.offsetHeight / 2) / 100)
  }


  const getBackground = () => {
    if (color && color.value) {
      const { r, g, b } = color.toRgb()
      return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`
    }
    return undefined
  }

  const update = () => {
    setThumbLeft(getThumbLeft())
    setThumbTop(getThumbTop())
    setBackground(getBackground())
  }


  return <div
    ref={$el}
    className={classnames('kenshin-color-alpha-slider', { 'is-vertical': vertical })}
  >
    <div
      className='kenshin-color-alpha-slider__bar'
      onClick={e => handleClick(e.nativeEvent)}
      ref={$bar}
      style={{ background }}
    />
    <div
      className='kenshin-color-alpha-slider__thumb'
      ref={$thumb}
      style={{ left: thumbLeft + 'px', top: thumbTop + 'px' }}
    />
  </div>
}

export default AlphaSlider
