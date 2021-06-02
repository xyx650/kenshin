import * as React from 'react'
import classnames from 'classnames'
import draggable from './draggable'
import type { DragOptions, ColorType } from './types'
import { colorPickerContext } from '../color-picker/context'
import {prefixCls as prefix} from '../config'


type HueSliderProps = {
  vertical: boolean;
  color: ColorType,
  onChange: (color: ColorType) => void
}

const HueSlider: React.FC<HueSliderProps> = (props) => {
  const { vertical, color } = props
  const $el = React.useRef<HTMLDivElement>(null)
  const $bar = React.useRef<HTMLDivElement>(null)
  const $thumb = React.useRef<HTMLDivElement>(null)

  // state
  const [thumbLeft, setThumbLeft] = React.useState(0)
  const [thumbTop, setThumbTop] = React.useState(0)

  const context = React.useContext(colorPickerContext)

  // componentDidMount
  React.useEffect(() => {
    const dragConfig: DragOptions = {
      drag: (e) => {handleDrag(e)},
      end: (e) => {handleDrag(e)}
    }
    draggable($bar.current!, dragConfig)
    draggable($thumb.current!, dragConfig)
    update()
  }, [])

  const handleClick = (e: MouseEvent) => {
    const thumb = $thumb.current
    const { target } = e
    if (target !== thumb) {
      handleDrag(e)
    }
  }
  const handleDrag = (e: MouseEvent) => {
    const rect = $el.current!.getBoundingClientRect()
    const thumb = $thumb.current!
    const { onChange } = context
    let hue: number
    if (!vertical) {
      let left = e.clientX - rect.left
      left = Math.min(left, rect.width - thumb.offsetWidth / 2)
      left = Math.max(thumb.offsetWidth / 2, left)
      hue = Math.round((left - thumb.offsetWidth / 2) / (rect.width - thumb.offsetWidth) * 360)
    } else {
      let top = e.clientY - rect.top
      top = Math.min(top, rect.height - thumb.offsetHeight / 2)
      top = Math.max(thumb.offsetHeight / 2, top)
      hue = Math.round((top - thumb.offsetHeight / 2) / (rect.height - thumb.offsetHeight) * 360)
    }
    color.set('hue', hue)
    update()
    onChange(color)
  }

  const getThumbLeft = () => {
    if (vertical) return 0
    const el = $el.current
    const hue = color.get('hue')
    if (!el) return 0
    const thumb = $thumb.current!
    return Math.round(+hue * (el.offsetWidth - thumb.offsetWidth / 2) / 360)
  }

  const getThumbTop = () => {
    if (!vertical) {return 0}
    const el = $el.current
    const hue = color.get('hue')
    if (!el) {return 0}
    const thumb = $thumb.current!
    return Math.round(+hue * (el.offsetHeight - thumb.offsetHeight / 2) / 360)
  }

  const update = () => {
    const top = getThumbTop()
    const left = getThumbLeft()
    setThumbTop(top)
    setThumbLeft(left)
  }

  return <div
    ref={$el}
    className={classnames(`${prefix}-color-hue-slider`, { 'is-vertical': vertical })}
    style={{ float: 'right' }}
  >
    <div
      className={`${prefix}-color-hue-slider__bar`}
      onClick={e => handleClick(e.nativeEvent)}
      ref={$bar}
    />
    <div
      className={`${prefix}-color-hue-slider__thumb`}
      style={{ left: `${thumbLeft}px`, top: `${thumbTop}px` }}
      ref={$thumb}
    />
  </div>
}

export default HueSlider
