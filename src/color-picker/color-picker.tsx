import * as React from 'react'
import type { SketchPickerProps, ColorResult } from 'react-color'
import { SketchPicker } from 'react-color'
import classnames from 'classnames'
import { prefixCls as prefix } from '../config'
import './picker.less'

export interface PickerProps extends Omit<SketchPickerProps, 'onChange' | 'color'> {
  mode?: 'hex' | 'rgb' | 'hsl';
  onChange?: (color: string) => void;
  defaultColor: string;
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
}

interface State {
  color: string;
  show: boolean;
}


class ColorPicker extends React.Component<PickerProps, State> {
  constructor(props: PickerProps) {
    super(props)
    this.state = {
      color: this.props.defaultColor,
      show: false
    }
  }

  close = () => {
    this.setState({ show: false })
  }
  click = () => {
    this.setState(state => ({ show: !state.show }))
  }
  onChange = (color: ColorResult) => {
    const backgroundColor = this.getBackgroundColor(color)
    this.props.onChange?.(backgroundColor)
    this.setState({ color: backgroundColor })
  }

  getBackgroundColor = (color: ColorResult) => {
    const { mode = 'hex' } = this.props
    switch (mode) {
      case 'rgb':
        return `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
      case 'hsl':
        return `hsla(${color.hsl.h}, ${color.hsl.s}, ${color.hsl.l}, ${color.hsl.a})`
      default:
        return color.hex
    }
  }

  changeColor = (color: string) => {
    const { mode = 'hex' } = this.props
    const [r, g, b, a = 1] = this.str2rgb(color)
    switch (mode) {
      case 'rgb':
        return {
          r: +r,
          g: +g,
          b: +b,
          a: +a
        } as ColorResult['rgb']
      case 'hsl':
        return {
          h: +r,
          s: +g,
          l: +b,
          a: +a
        } as ColorResult['hsl']
      default:
        return color as ColorResult['hex']
    }
  }

  str2rgb(str: string) {
    return str.match(/(\d+)/g) || []
  }

  render() {
    const {
      prefixCls = prefix,
      className,
      style,
      ...restProps
    } = this.props

    const popoverStyle: React.CSSProperties = {
      position: 'absolute',
      zIndex: 2
    }
    const coverStyle: React.CSSProperties = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    }

    const colorStyle: React.CSSProperties = {
      display: 'inline-block',
      width: '36px',
      height: '14px',
      borderRadius: '2px',
      background: this.state.color
    }

    const wrapperStyle: React.CSSProperties = {
      padding: '5px',
      background: '#fff',
      borderRadius: '1px',
      fontSize: 0,
      display: 'inline-block',
      cursor: 'pointer'
    }

    return (
      <>
        <div
          style={{ ...wrapperStyle, ...style }}
          onClick={this.click}
          className={classnames(`${prefixCls}-picker`, className)}
        >
          <span style={colorStyle} />
        </div>
        <div className={classnames(`${prefixCls}-picker-panel`)} />
        {
          this.state.show && <div style={popoverStyle}>
            <div style={coverStyle} onClick={this.close} />
            <SketchPicker {...restProps} onChange={this.onChange} color={this.state.color} />
          </div>
        }
      </>
    )
  }

  static displayName = 'ColorPicker'

  static defaultProps = {
    mode: 'hex',
    presetColors: []
  }
}


export default ColorPicker
