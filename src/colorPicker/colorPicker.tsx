import * as React from 'react'
import classnames from 'classnames'
import Component from '../_base/component'
import PickerDropdown from '@/colorPicker/pickerDropdown'
import Color from './color'
import './index.less'
// import 'element-theme-default'
import type { ColorType } from '@/colorPicker/types'

export type ColorPickerProps = {
  value: string | number | null,
  showAlpha: boolean,
  colorFormat: string,
  onChange: (color: string | null) => void
}


export type ColorPickerState = {
  value: string | null | number,
  color: ColorType,
  showPicker: boolean,
  showPanelColor: boolean
}


class ColorPicker extends Component<ColorPickerProps, ColorPickerState> {
  static defaultProps: { onChange: () => void }

  private dropdown = React.createRef<PickerDropdown>()

  popperElm: React.RefObject<PickerDropdown>['current'] | undefined

  constructor(props: ColorPickerProps) {
    super(props)
    const color = new Color({
      enableAlpha: this.props.showAlpha,
      format: this.props.colorFormat
    } as ColorType)

    this.state = {
      value: this.props.value,
      color,
      showPicker: false,
      showPanelColor: false
    }
  }

  componentDidMount() {
    const { value, color } = this.state
    if (value) {
      color.fromString!(value.toString())
      this.setState({ color })
    }
    this.popperElm = this.dropdown.current!
  }

  getChildContext() {
    return {
      onChange: this.handleChange.bind(this)
    }
  }

  //
  handleChange(color: Color) {
    this.setState({ value: color.value as string, color })
  }

  // 输入后确认
  confirmValue() {
    const { value } = this.state
    const { onChange } = this.props
    this.setState({ showPicker: false }, () => onChange(value as string))
  }

  // 删除值
  clearValue() {
    this.setState({
      showPicker: false,
      showPanelColor: false,
      value: null
    }, () => {
      this.props.onChange(null)
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
      color.fromString!(value.toString())
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
      <PickerDropdown
        ref={this.dropdown}
        showPicker={showPicker}
        color={color}
        onPick={() => this.confirmValue()}
        onClear={() => this.clearValue()}
        showAlpha={showAlpha}
      />

    </div>
  }
}

ColorPicker.defaultProps = {
  onChange() {}
}


export default ColorPicker
