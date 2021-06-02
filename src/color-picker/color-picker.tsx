import * as React from 'react'
import classnames from 'classnames'
import { colorPickerContext } from '../color-picker/context'
import PickerDropdown from './picker-dropdown'
import Color from './color'
import { prefixCls as prefix } from '../config'
import './index.less'

export type ColorPickerProps = {
  value: string | number | null,
  showAlpha: boolean,
  colorFormat: string,
  onChange: (color: string | null) => void
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
}


const ColorPicker: React.FC<ColorPickerProps> = props => {
  const {
    showAlpha,
    colorFormat,
    onChange = (color: string | null) => {},
    prefixCls = prefix
  } = props

  const [value, setValue] = React.useState(props.value)
  const [color, setColor] = React.useState(new Color({
    enableAlpha: showAlpha,
    format: colorFormat
  } as Color))
  const [showPicker, setShowPicker] = React.useState(false)
  const [showPanelColor, setShowPanelColor] = React.useState(false)

  // 挂载后设置值
  React.useEffect(() => {
    if (value) {
      color.fromString(value.toString())
      setColor(color)
    }
  }, [])

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

  // 隐藏组件
  const handleClickOutside = () => {
    setShowPicker(false)
  }

  // 重置颜色
  const resetColor = () => {
    if (value) {
      color.fromString(value.toString())
      setColor(color)
    }
  }

  // 删除值
  const clearValue = () => {
    setShowPicker(false)
    setValue(null)
    setShowPanelColor(false)

    onChange(null)
    resetColor()

    // this.setState({
    //   showPicker: false,
    //   showPanelColor: false,
    //   value: null
    // }, () => {
    //   this.props.onChange(null)
    //   this.resetColor()
    // })
  }

  const hide = () => {
    setShowPicker(false)
    resetColor()
    // this.setState({ showPicker: false }, () => this.resetColor())
  }

  //
  const handleChange = (color: Color) => {
    setValue(color.value)
    setColor(color)
  }

  // 输入后确认
  const confirmValue = () => {
    // this.setState({ showPicker: false }, () => onChange(value as string))
    setShowPicker(false)
    onChange(value as string)
  }

  return <colorPickerContext.Provider value={{ onChange: handleChange }}>
    <div className={classnames(`${prefixCls}-color-picker`, props.className)} style={props.style}>
      <div className={`${prefixCls}-color-picker__trigger`} onClick={() => setShowPicker(!showPicker)}>
      <span className={classnames(`${prefixCls}-color-picker__color`, { 'is-alpha': showAlpha })}>
        <span className={`${prefixCls}-color-picker__color-inner`} style={{ backgroundColor: displayedColor }} />
        {!value && !showPanelColor && <span className={`${prefixCls}-color-picker__empty ${prefixCls}-icon-close`} />}
        </span>
        <span className={`${prefixCls}-color-picker__icon ${prefixCls}-icon-caret-bottom`} />
      </div>
      <PickerDropdown
        showPicker={showPicker}
        color={color}
        onPick={confirmValue}
        onClear={clearValue}
        showAlpha={showAlpha}
        onChange={color => props.onChange(color)}
      />
    </div>
  </colorPickerContext.Provider>
}

ColorPicker.defaultProps = {
  onChange(color: string | null) {}
}


export default ColorPicker
