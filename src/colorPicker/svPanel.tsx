import * as React from 'react'
import Component from '@/_base/component'
import draggable from '@/colorPicker/draggable'
import type { ColorType, DragOptions, SvPanelState } from '@/colorPicker/types'


export type SvPanelProps = {
  color: ColorType;
  onChange: (color: ColorType) => void
}

export default class SvPanel extends Component<SvPanelProps, SvPanelState> {
  private $el = React.createRef<HTMLDivElement>()

  constructor(props: SvPanelProps) {
    super(props)
    this.state = {
      cursorTop: 0,
      cursorLeft: 0,
      background: 'hsl(0, 100%, 50%)'
    }
  }

  componentDidMount() {
    const dragConfig: DragOptions = {
      drag: e => {this.handleDrag(e)},
      end: e => {this.handleDrag(e)}
    }
    draggable(this.$el.current!, dragConfig)
    this.update()
  }

  static getDerivedStateFromProps(nextProps: SvPanelProps, curState: SvPanelState) {
    const { background } = curState
    const newBackground = 'hsl(' + nextProps.color.get('hue') + ', 100%, 50%)'
    if (newBackground !== background) {
      new SvPanel(nextProps).update(nextProps)
    }
    return null
  }

  update(props?: SvPanelProps) {
    const { color } = props || this.props
    const saturation = color.get('saturation')
    const value = color.get!('value')
    const el = this.$el.current!
    let { width, height } = el.getBoundingClientRect()
    if (!height) height = width * 3 / 4
    this.setState({
      cursorLeft: +saturation * width / 100,
      cursorTop: (100 - +value) * height / 100,
      background: 'hsl(' + color.get('hue') + ', 100%, 50%)'
    })
  }

  handleDrag(e: MouseEvent) {
    const { color } = this.props
    const { onChange } = this.context
    const el = this.$el.current!
    const rect = el.getBoundingClientRect()
    let left = e.clientX - rect.left
    let top = e.clientY - rect.top
    left = Math.max(0, left)
    left = Math.min(left, rect.width)
    top = Math.max(0, top)
    top = Math.min(top, rect.height)
    this.setState({
      cursorLeft: left,
      cursorTop: top,
      background: 'hsl(' + color.get('hue') + ', 100%, 50%)'
    }, () => {
      color.set({
        saturation: (left / rect.width * 100).toString(),
        value: (100 - top / rect.height * 100).toString()
      })
      onChange(color)
    })
  }

  render() {
    const { cursorTop, cursorLeft, background } = this.state
    return (
      <div
        className='kenshin-color-svpanel'
        style={{ backgroundColor: background }}
        ref={this.$el}
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
    )
  }
}
