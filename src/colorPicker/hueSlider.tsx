import * as React from 'react'
import draggable from './draggable'
import Component from '@/_base/component'
import type { DragOptions, ColorType } from '@/colorPicker/types'
import { childContext } from '@/colorPicker/pickerDropdown'


type HueSliderProps = {
  vertical: boolean;
  color: ColorType,
  onChange?: (color: ColorType) => void
}

type HueSliderState = {
  thumbLeft: number;
  thumbTop: number
}


export default class HueSlider extends Component<HueSliderProps, HueSliderState> {
  private $el = React.createRef<HTMLDivElement>()
  private thumb = React.createRef<HTMLDivElement>()
  private bar = React.createRef<HTMLDivElement>()

  constructor(props: HueSliderProps) {
    super(props)
    this.state = {
      thumbLeft: 0,
      thumbTop: 0
    }
  }

  componentDidMount() {
    const { bar, thumb } = this
    const dragConfig: DragOptions = {
      drag: (event) => {this.handleDrag(event)},
      end: (event) => {this.handleDrag(event)}
    }
    draggable(bar.current!, dragConfig)
    draggable(thumb.current!, dragConfig)
    this.update()
  }

  handleClick(e: MouseEvent) {
    const thumb = this.thumb.current!
    const target = e.target
    // if (target !== thumb) {
    this.handleDrag(e)
    // }
  }

  handleDrag(e: MouseEvent) {
    const rect = this.$el.current!.getBoundingClientRect()
    const thumb = this.thumb.current!
    const { vertical, color } = this.props
    const { onChange } = this.context
    let hue
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
    color.set('hue', hue!.toString())
    this.update()
    onChange(color)
  }

  getThumbLeft(): number {
    const { vertical, color } = this.props
    if (vertical) return 0
    const el = this.$el.current
    const hue = color.get('hue')
    if (!el) return 0
    const thumb = this.thumb.current!
    return Math.round(+hue * (el.offsetWidth - thumb.offsetWidth / 2) / 360)
  }

  getThumbTop(): number {
    const { vertical, color } = this.props
    if (!vertical) return 0
    const el = this.$el.current
    const hue = color.get('hue')
    if (!el) return 0
    const thumb = this.thumb.current!
    return Math.round(+hue * (el.offsetHeight - thumb.offsetHeight / 2) / 360)
  }

  update() {
    this.setState({
      thumbLeft: this.getThumbLeft(),
      thumbTop: this.getThumbTop()
    })
  }


  render() {
    const { vertical } = this.props
    const { thumbLeft, thumbTop } = this.state
    return (
      <div
        ref={this.$el}
        className={this.classNames({ 'kenshin-color-hue-slider': true, 'is-vertical': vertical })}
        style={{ float: 'right' }}
      >
        <div
          className='kenshin-color-hue-slider__bar'
          onClick={e => this.handleClick(e.nativeEvent)}
          ref='bar'
        />
        <div
          className='kenshin-color-hue-slider__thumb'
          style={{ left: thumbLeft + 'px', top: thumbTop + 'px' }}
          ref={this.thumb}
        />
      </div>
    )
  }
}

