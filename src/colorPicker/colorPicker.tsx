import * as React from 'react'
import classnames from 'classnames'
import Component from '../_base/component'
import Color from './color'
import './index.less'

export type ColorPickerProps = {
  value?: string,
  showAlpha: boolean,
  colorFormat: string,
  onChange: () => void
}

type ColorType = {
  _hue?: number,
  _saturation?: number,
  _value?: number,
  _alpha?: number,
  enableAlpha?: boolean,
  format?: string,
  value?: string,
  set: (props: string, value: unknown) => void,
  get: (props: string) => unknown,
  toRgb: () => { r: number, g: number, b: number },
  fromString: (value: string) => void,
  doOnChange: () => void
}

export type ColorPickerState = {
  value?: string,
  color: ColorType,
  showPicker: boolean,
  showPanelColor: boolean
}

class ColorPicker extends Component<ColorPickerProps, ColorPickerState> {
  static defaultProps: { onChange?: () => void }

  constructor(props: ColorPickerProps) {
    super(props)
    const color: ColorType = new Color({
      enableAlpha: this.props.showAlpha,
      format: this.props.colorFormat
    })

    this.state = {
      value: this.props.value,
      color: color,
      showPicker: false,
      showPanelColor: false
    }
  }

  componentDidMount() {
    const { value, color } = this.state
    if (value) {
      color.fromString(value)
      this.setState({ color })
    }
    this.popperElm = this.refs.dropdown
  }

  getChildContext() {
    return {
      onChange: this.handleChange.bind(this)
    }
  }

  //
  handleChange(color: ColorType): void {
    this.setState({ value: color.value!, color })
  }

  // 输入后确认
  confirmValue() {
    const { value } = this.state
    const { onChange } = this.props
    this.setState({ showPicker: false }, () => onChange(value))
  }

  // 删除值
  clearValue() {
    this.setState({
      showPicker: false,
      showPanelColor: false,
      value: undefined
    }, () => {
      this.props.onChange()
      this.resetColor()
    })
  }

  hide() {
    this.setState({ showPicker: false }, () => this.resetColor())
  }

  // 重置颜色
  resetColor(): void {
    const { value, color } = this.state
    if (value) {
      color.fromString(value)
      this.setState({ color })
    }
  }

  // 隐藏组件
  handleClickOutside(): void {
    this.setState({ showPicker: false })
  }


  render() {
    const { showAlpha } = this.props
    const { value, color, showPicker, showPanelColor } = this.state

    let displayedColor
    if (!value && !showPanelColor) {
      displayedColor = 'transparent'
    } else {
      const { r, g, b } = color.toRgb()
      const alpha = color.get('alpha')
      if (typeof alpha === 'number') {
        displayedColor = showAlpha
          ? `rgba(${r}, ${g}, ${b}, ${alpha / 100})`
          : `rgb(${r}, ${g}, ${b})`
      }
    }

    return <div className='kenshin-color-picker'>
      <div
        className='kenshin-color-picker__trigger'
        onClick={() => this.setState({ showPicker: !showPicker })}
      >
        <span
          className={this.classNames({
            'kenshin-color-picker__color': true,
            'is-alpha': showAlpha
          })}
        >
          <span className='kenshin-color-picker__color-inner' style={{ backgroundColor: displayedColor }} />
          {!value && !showPanelColor && <span className='kenshin-color-picker__empty kenshin-icon-close' />}
          </span>
        <span className='kenshin-color-picker__icon kenshin-icon-caret-bottom' />
      </div>


    </div>
  }
}

ColorPicker.defaultProps = {
  onChange() {}
}

export default ColorPicker
