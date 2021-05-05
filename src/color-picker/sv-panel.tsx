import * as React from 'react'
import { colorPickerContext } from '@/color-picker/context'
import draggable from './draggable'
import type { ColorType, DragOptions, SvPanelState } from './types'


export type SvPanelProps = {
  color: ColorType;
  onChange: (color: ColorType) => void
}


const SvPanel: React.FC<SvPanelProps> = (props) => {

  const [cursorTop, setCursorTop] = React.useState(0)
  const [cursorLeft, setCursorLeft] = React.useState(0)
  const [background, setBackground] = React.useState('hsl(0, 100%, 50%)')

  const { color } = props
  const $el = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const dragConfig: DragOptions = {
      drag: e => {handleDrag(e)},
      end: e => {handleDrag(e)}
    }
    draggable($el.current!, dragConfig)
    update()
  }, [])

  React.useEffect(() => {
    const el = $el.current!
    const rect = el.getBoundingClientRect()
    color.set({
      saturation: (cursorLeft / rect.width * 100).toString(),
      value: (100 - cursorTop / rect.height * 100).toString()
    })
    context.onChange(color)
  }, [cursorTop, cursorLeft, background])

  const context = React.useContext(colorPickerContext)

  const update = (p?: SvPanelProps) => {
    const { color } = p || props
    const saturation = color.get('saturation')
    const value = color.get!('value')
    const el = $el.current!
    let { width, height } = el.getBoundingClientRect()
    if (!height) height = width * 3 / 4
    setBackground('hsl(' + color.get('hue') + ', 100%, 50%)')
    setCursorTop((100 - +value) * height / 100)
    setCursorLeft(+saturation * width / 100)
  }


  const handleDrag = (e: MouseEvent) => {

    const { onChange } = context
    const el = $el.current!
    const rect = el.getBoundingClientRect()
    let left = e.clientX - rect.left
    let top = e.clientY - rect.top
    left = Math.max(0, left)
    left = Math.min(left, rect.width)
    top = Math.max(0, top)
    top = Math.min(top, rect.height)
    // this.setState({
    //   cursorLeft: left,
    //   cursorTop: top,
    //   background: 'hsl(' + color.get('hue') + ', 100%, 50%)'
    // }, () => {
    //   color.set({
    //     saturation: (left / rect.width * 100).toString(),
    //     value: (100 - top / rect.height * 100).toString()
    //   })
    //   onChange(color)
    // })
    setBackground('hsl(' + color.get('hue') + ', 100%, 50%)')
    setCursorTop(top)
    setCursorLeft(left)
  }

  return <div
    className='kenshin-color-svpanel'
    style={{ backgroundColor: background }}
    ref={$el}
  >
    <div className='kenshin-color-svpanel__white' />
    <div className='kenshin-color-svpanel__black' />
    <div
      className='kenshin-color-svpanel__cursor'
      style={{ top: cursorTop + 'px', left: cursorLeft + 'px' }}
    >
      <div />
    </div>
  </div>
}

export default SvPanel
