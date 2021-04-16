import * as React from 'react'

import Component from '@/_base/component'
import draggable from '@/colorPicker/draggable'
import type { DragOptions, AlphaSliderState } from '@/colorPicker/types'

type AlphaSliderProps = {
  color: any,
  vertical: boolean
}

export default class AlphaSlider extends Component<AlphaSliderProps, AlphaSliderState> {
  private $el = React.createRef<HTMLDivElement>()
  private bar = React.createRef<HTMLDivElement>()
  private thumb = React.createRef<HTMLDivElement>()

  constructor(props: AlphaSliderProps) {
    super(props)

    this.state = {
      thumbLeft: 0,
      thumbTop: 0,
      background: null
    }
  }

  componentDidMount() {
    const { bar, thumb } = this
    const dragConfig: DragOptions = {
      drag: e => {this.handleDrag(e)},
      end: e => {this.handleDrag(e)}
    }
    draggable(bar.current!, dragConfig)
    draggable(thumb.current!, dragConfig)
    this.update()
  }

  handleClick(e: MouseEvent) {
    // const thumb = this.refs.thumb
    // const target = e.target
    // if (target !== thumb) {
    this.handleDrag(e)
    // }
  }

  handleDrag(e: MouseEvent) {
    const { vertical, color } = this.props
    const { onChange } = this.context
    const rect = this.$el.current!.getBoundingClientRect()
    const thumb = this.thumb.current!
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
    this.update()
    onChange(color)
  }

  getThumbLeft() {
    const { vertical, color } = this.props
    if (vertical) return 0
    const el = this.$el.current!
    const alpha = color._alpha
    if (!el) return 0
    const thumb = this.thumb.current!
    return Math.round(alpha * (el.offsetWidth - thumb.offsetWidth / 2) / 100)
  }

  getThumbTop() {
    const { vertical, color } = this.props
    if (!vertical) return 0
    const el = this.$el.current!
    const alpha = color._alpha
    if (!el) return 0
    const thumb = this.thumb.current!
    return Math.round(alpha * (el.offsetHeight - thumb.offsetHeight / 2) / 100)
  }

  getBackground() {
    const { color } = this.props
    if (color && color.value) {
      const { r, g, b } = color.toRgb()
      return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`
    }
    return null
  }

  update() {
    this.setState({
      thumbLeft: this.getThumbLeft(),
      thumbTop: this.getThumbTop(),
      background: this.getBackground()
    })
  }

  render() {
    const { vertical } = this.props
    const { thumbLeft, thumbTop, background } = this.state
    return (
      <div
        ref={this.$el}
        className={this.classNames({ 'kenshin-color-alpha-slider': true, 'is-vertical': vertical })}
      >
        <div
          className='kenshin-color-alpha-slider__bar'
          onClick={e => this.handleClick(e.nativeEvent)}
          ref={this.bar}
          style={{ background: background! }}
        />
        <div
          className='kenshin-color-alpha-slider__thumb'
          ref={this.thumb}
          style={{ left: thumbLeft + 'px', top: thumbTop + 'px' }}
        />
      </div>
    )
  }
}
