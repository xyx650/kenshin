import * as React from 'react'
import Component from '@/_base/component'
import { SliderContext } from '@/slider/sliderContext'

export type SliderButtonState = {
  hovering: boolean
  dragging: boolean
  startX: number
  startY: number
  currentX: number
  currentY: number
  startPosition: number
}

export type SliderButtonProps = {
  onChange: (n: number) => void
  value: number
  vertical: boolean
}

export default class SliderButton extends Component<SliderButtonProps, SliderButtonState> {
  private newPosition: number = 0
  static defaultProps = {
    value: 0
  }

  constructor(props: SliderButtonProps) {
    super(props)
    this.state = {
      hovering: false,
      dragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      startPosition: 0
    }
  }

  parent() {
    return this.context
  }

  handleMouseEnter = () => {
    this.setState({ hovering: true })
  }

  handleMouseLeave = () => {
    this.setState({ hovering: false })
  }

  onButtonDown(e: React.MouseEvent<HTMLDivElement>) {
    if (this.disabled()) return

    this.onDragStart(e.nativeEvent)

    document.addEventListener('mousemove', this.onDragging)
    document.addEventListener('mouseup', this.onDragEnd)
    document.addEventListener('contextmenu', this.onDragEnd)
  }

  onDragStart(e: MouseEvent) {
    this.setState({
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startPosition: parseInt(this.currentPosition(), 10)
    })
  }

  onDragging = (e: MouseEvent) => {
    const { dragging, startY, currentY, currentX, startX, startPosition } = this.state
    const { vertical } = this.props
    if (dragging) {
      this.setState({
        currentX: e.clientX,
        currentY: e.clientY
      }, () => {
        const diff = vertical
          ? (startY - currentY) / this.parent().sliderSize() * 100
          : (currentX - startX) / this.parent().sliderSize() * 100
        this.newPosition = startPosition + diff
        this.setPosition(this.newPosition)
      })
    }
  }

  onDragEnd = () => {
    const { dragging } = this.state
    if (dragging) {
      /*
       * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
       * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
       */
      setTimeout(() => {
        this.setState({
          dragging: false
        }, () => {
          this.setPosition(this.newPosition)
        })
      }, 0)

      document.removeEventListener('mousemove', this.onDragging)
      document.removeEventListener('mouseup', this.onDragEnd)
      document.removeEventListener('contextmenu', this.onDragEnd)
    }
  }


  setPosition(newPosition: number) {

    newPosition = newPosition < 0 ? 0 : newPosition > 100 ? 100 : newPosition

    const lengthPerStep = 100 / ((this.max - this.min) / this.step)
    const steps = Math.round(newPosition / lengthPerStep)
    const value = steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min

    this.props.onChange(parseFloat(value.toFixed(this.precision())))
  }

  formatValue(props) {

    if (props.formatTooltip instanceof Function) {
      return props.formatTooltip(this.props.value)
    }

    return this.props.value
  }

  disabled(props) {
    return props.disabled
  }

  max(props) {
    return props.max
  }

  min(props) {
    return props.min
  }

  step() {
    return this.parent().props.step
  }

  precision() {
    return this.parent().state.precision
  }

  currentPosition(props) {
    return `${(this.props.value - props.min) / (props.max - props.min) * 100}%`
  }

  wrapperStyle(props) {
    this.max=props.max
    this.min=props.min
    this.step=props.step
    return this.props.vertical ? { bottom: this.currentPosition(props) } : { left: this.currentPosition(props) }
  }


  render() {
    const { hovering, dragging } = this.state

    return (
      <SliderContext.Consumer>
        {
          ({ props }) => <div
            className={this.classNames('kenshin-slider__button-wrapper', {
              'hover': hovering,
              'dragging': dragging
            })}
            style={this.wrapperStyle(props)}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onMouseDown={e => this.onButtonDown(e)}>
            {/*<Tooltip*/}
            {/*  placement='top'*/}
            {/*  content={<span>{this.formatValue()}</span>}*/}
            {/*  disabled={!this.parent().props.showTooltip}*/}
            {/*>*/}
            {/*  <div*/}
            {/*    className={this.classNames('kenshin-slider__button', {*/}
            {/*      'hover': hovering,*/}
            {/*      'dragging': dragging*/}
            {/*    })}*/}
            {/*  />*/}
            {/*</Tooltip>*/}
          </div>
        }
      </SliderContext.Consumer>

    )
  }
}
SliderButton.contextType = SliderContext
